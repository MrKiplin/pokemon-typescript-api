import bodyParser = require("body-parser");
import * as express from "express";
import { join } from "path";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { getPokemonRoute } from "./routes/get-pokemon";
import { internalHealthCheck } from "./routes/internal-health-check";
import { internalSwagger } from "./routes/internal-swagger";
const swaggerDocument = YAML.load(join(__dirname, "swagger.yaml"));

export const createRestApp = async () => {
  const app = express();
  app.use(bodyParser.json({ type: "*/*" }));
  app.use(
    "/internal/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  app.use("/internal/", internalHealthCheck);
  app.use("/internal/swagger.yaml", internalSwagger());
  app.use("/api/pokemon/", getPokemonRoute());

  return app;
};
