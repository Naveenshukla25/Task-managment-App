import todoRoute from "./routes/task.route.js";
import userRoute from "./routes/user.route.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();
//midddelware and parsing  request into
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://task-managment-0h1s.onrender.com',
  credentials: true
}));


const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;

//db connectivity
try {
  mongoose.connect(DB_URL);
  console.log("coonected  to db");
} catch (error) {
  console.log(error);
}
//routes
app.use("/api/todo", todoRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`server run on ${PORT}`);
});
