import express from "express";
import { addProduct, getProduct, getProductById, editProduct, deleteProduct } from "../controller/productsController.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/edit/:id", editProduct);
productRouter.post("/add", addProduct);
productRouter.delete("/remove/:id", deleteProduct);

export default productRouter;
