import express from "express";
import { addCategory, getCategory, editCategory, deleteCategory, getCategoryById } from "../controller/categoriesController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/add", addCategory);
categoryRouter.put("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
