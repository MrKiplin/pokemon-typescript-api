import * as express from "express";
import { join } from "path";

export const internalSwagger = () => {
  const router = express.Router();
  const swaggerFilePath = join(__dirname, "../swagger.yaml");

  router.get("/", (req, res) => res.sendFile(swaggerFilePath));
  return router;
};
