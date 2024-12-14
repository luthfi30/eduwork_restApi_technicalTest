import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

// Register User
const registerUser = async (req, res) => {
  try {
    // Extract data from the request body
    const { us_name, us_email, us_password, us_phone_number, us_address } = req.body;

    // Check if the user already exists (optional but recommended)
    const existingUser = await usersModel.findOne({ us_email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10); // Generate salt (10 rounds)
    const hashedPassword = await bcrypt.hash(us_password, salt); // Hash the password

    // Create a new user with the hashed password
    const newUser = new usersModel({
      us_name,
      us_email,
      us_password: hashedPassword, // Store the hashed password
      us_phone_number,
      us_address,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user data (excluding password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: savedUser._id,
        us_name: savedUser.us_name,
        us_email: savedUser.us_email,
        us_phone_number: savedUser.us_phone_number,
        us_address: savedUser.us_address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { us_email, us_password } = req.body;

    // Find the user by email (case-sensitive or case-insensitive as needed)
    const user = await usersModel.findOne({ us_email });

    if (!user) {
      return res.status(400).json({ message: "User tidak ada" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(us_password, user.us_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password tidak sesuai" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.us_name, email: user.us_email },
      process.env.JWT_SECRET, // Ensure you have a secret key set in environment variables
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the token and user data (excluding password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.us_name,
          email: user.us_email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  const data = await usersModel.find();
  res.json({ success: true, data: data });
};

const addUsers = async (req, res) => {
  const data = await usersModel.create(req.body);
  res.json({ success: true, data: data });
};

export { registerUser, loginUser, addUsers, getUsers };
