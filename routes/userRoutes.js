import express from "express";
import { addUsers, getUsers, registerUser, loginUser } from "../controller/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", getUsers);
usersRouter.post("/add", addUsers);

export default usersRouter;
