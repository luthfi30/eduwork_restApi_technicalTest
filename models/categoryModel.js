import mongoose from "mongoose";
//schema
const schemaData = new mongoose.Schema(
  {
    ct_name: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Categories", schemaData);
export default categoryModel;
