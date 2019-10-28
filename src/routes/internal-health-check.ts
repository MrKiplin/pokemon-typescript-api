import * as express from "express";

// export const internalHealthCheck = () => {
export const internalHealthCheck = express.Router();

internalHealthCheck.get("/health-check", (req, res) =>
  res.json({ healthy: true })
);
// return router;
// };
