import mongoose from "mongoose";
//schema
const schemaData = new mongoose.Schema(
  {
    pd_ct_id: {
      type: mongoose.Schema.Types.ObjectId, // Menggunakan ObjectId untuk relasi ke kategori
      ref: "Categories", // Menyebutkan model Category
      required: true, // Wajib untuk setiap produk
    },
    pd_name: {
      type: String,
      required: true, // Nama produk wajib diisi
    },
    pd_price: {
      type: Number,
      required: true, // Harga produk wajib diisi
    },
  },
  {
    timestamps: true,
  }
);

const productsModel = mongoose.model("Products", schemaData);
export default productsModel;
