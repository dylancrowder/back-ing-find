// docs/swaggerDoc.js
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = yaml.load(
  path.resolve(__dirname, "../documentation/swagger.yaml")
);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
