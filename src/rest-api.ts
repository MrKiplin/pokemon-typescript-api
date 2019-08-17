import bodyParser = require("body-parser");
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import * as getPokemon from "./routes/get-pokemon";
import * as swaggerDocument from "./swagger.json";

export const createRestApp = () => {
  const app = express();
  app.use(bodyParser.json({ type: "*/*" }));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/.well-known/health-check", (req, res) =>
    res.json({ healthy: true })
  );
  app.get("/.well-known/swagger.yaml", (req, res) =>
    res.sendFile("./swagger.yaml", { root: __dirname })
  );
  app.use("/api/pokemon/", getPokemon);

  const port = process.env.PORT || 3000;
  // tslint:disable-next-line: no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
};
