import * as express from "express";
import { join } from "path";

export const internalSwaggerRoute = express.Router();
const swaggerFilePath = join(__dirname, "../swagger.yaml");

internalSwaggerRoute.get("/", (req, res) => res.sendFile(swaggerFilePath));
