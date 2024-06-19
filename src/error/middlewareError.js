import enumError from "./enumError.js";
export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error.cause || error.message);
  switch (error.code) {
    case enumError.BAD_REQUEST_ERROR:
    case enumError.INVALID_PARAMS_ERROR:
    case enumError.EMPTY_QUERY:
      res.status(400).json({ status: "error", message: error.message });
      break;
    case enumError.DATA_BASE_ERROR:
    case enumError.ROUTING_ERROR:
    default:
      res.status(500).json({ status: "error", message: error.message });
  }
};
