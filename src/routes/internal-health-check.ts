import * as express from "express";

export const internalHealthCheckRoute = express.Router();

internalHealthCheckRoute.get("/health-check", (req, res) =>
  res.json({ healthy: true })
);
