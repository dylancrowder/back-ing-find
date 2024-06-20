import express from "express";
import AxiosController from "../controller/axios.controller.js";
import { CustomError } from "../error/CustomError.js";
import { errorGetData, generatorErrorQuery } from "../error/causeError.js";
import enumError from "../error/enumError.js";

const router = express.Router();

router.get("/get", async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      throw CustomError.create({
        name: "QueryMissingError",
        cause: generatorErrorQuery(),
        message: "Debes proporcionar una consulta en la query.",
        code: enumError.EMPTY_QUERY,
      });
    }

    const img = await AxiosController.getImg(query);

    console.log("esta es la respuesta ", img.status);
    console.log("esta es la data", img.data.hits.length);
    if (img.status === 200 && img.data.hits.length === 0) {
      throw CustomError.create({
        name: "ImgNotFound",
        cause: errorGetData(img),
        message: "No se encontraron imagenes con este nombre.",
        code: enumError.BAD_REQUEST_ERROR,
      });
    }

    const response = img.data;
    if (!response) {
      throw CustomError.create({
        name: "DataFetchError",
        cause: errorGetData(img),
        message: "No se encontraron datos para la consulta proporcionada.",
        code: enumError.INVALID_PARAMS_ERROR,
      });
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
