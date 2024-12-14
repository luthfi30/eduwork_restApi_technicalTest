import productsModel from "../models/productsModel.js";
import categoryModel from "../models/categoryModel.js";

const getProduct = async (req, res) => {
  try {
    const products = await productsModel.find().populate("pd_ct_id");
    res.status(200).json({
      success: true,
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id).populate("pd_ct_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await productsModel.findByIdAndUpdate(productId, updatedData, { new: true }).populate("pd_ct_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  const { pd_name, pd_price, pd_ct_id } = req.body;

  try {
    const category = await categoryModel.findById(pd_ct_id);
    if (!category) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Category not found",
      });
    }

    const newProduct = new productsModel({
      pd_name,
      pd_price,
      pd_ct_id,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      status: 201,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export { addProduct, getProduct, getProductById, editProduct, deleteProduct };
