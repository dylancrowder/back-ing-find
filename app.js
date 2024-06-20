import express from "express";
import axiosRoute from "./src/router/axios.router.js";
import cors from "cors";
import { errorHandlerMiddleware } from "./src/error/middlewareError.js";
import swaggerSetup from "./src/documentation/swagger.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
swaggerSetup(app);
app.use("/", axiosRoute);
app.use("/", (req, res) => {
  res.send("hola mundo");
});
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`App connected successfully. Listening on port ${PORT}`);
});
