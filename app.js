import express from "express";
import axiosRoute from "./src/router/axios.router.js";
import cors from "cors";
import { errorHandlerMiddleware } from "./src/error/middlewareError.js";
import swaggerSetup from "./src/documentation/swagger.js";
const app = express();
const PORT = 8080;

app.use(cors());
swaggerSetup(app);
app.use("/", axiosRoute);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`App connected successfully. Listening on port ${PORT}`);
});
