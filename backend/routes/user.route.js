import express from "express";
import { login, register } from "../../backend/controller/user.controller.js";

const route = express.Router();

route.post("/signup", register);
route.post("/login", login);

export default route;
