import * as express from "express";

export const internalHealthCheck = () => {
  const router = express.Router();

  router.get("/health-check", (req, res) => res.json({ healthy: true }));
  return router;
};
