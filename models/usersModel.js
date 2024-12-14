import mongoose from "mongoose";
//schema
const schemaData = new mongoose.Schema(
  {
    us_name: String,
    us_password: String,
    us_email: String,
    us_phone_number: Number,
    us_address: String,
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("Users", schemaData);
export default usersModel;
