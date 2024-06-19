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

    if (!img) {
      throw CustomError.create({
        name: "DataFetchError",
        cause: errorGetData(query),
        message: "No se encontraron datos para la consulta proporcionada.",
        code: enumError.DATA_BASE_ERROR,
      });
    }

    res.status(200).json(img);
  } catch (error) {
    next(error);
  }
});

export default router;
