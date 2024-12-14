import categoryModel from "../models/categoryModel.js";

const getCategory = async (req, res) => {
  try {
    const data = await categoryModel.find();
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  const data = await categoryModel.create(req.body);
  res.json({ success: true, data: data });
};

const editCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCategory = await categoryModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id; // Menggunakan parameter URL
  console.log(id);
  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await categoryModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Category item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to delete category item" });
  }
};
export { addCategory, getCategory, editCategory, deleteCategory, getCategoryById };
