import axios from "axios";
import bodyParser = require("body-parser");
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { join } from "path";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { getPokemonErrorMiddleware } from "./middleware/get-pokemon-error-middleware";
import { PokemonService } from "./pokemon-service/pokemon-service";
import { internalHealthCheck } from "./routes/internal-health-check";
const swaggerDocument = YAML.load(join(__dirname, "swagger.yaml"));

export const getPokemon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const pokemonNameOrId = req.params.pokemonNameOrId;
  const pokemonService = new PokemonService(
    axios.create({ baseURL: "https://pokeapi.co/api/v2" })
  );

  try {
    const pokemonInfo = await pokemonService.getPokemonInfo(pokemonNameOrId);
    res.status(200).json({ pokemonInfo });
    return next();
  } catch (error) {
    return next(error);
  }
};

export const createRestApp = () => {
  const app = express();
  app.use(bodyParser.json({ type: "*/*" }));
  app.use(
    "/internal/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

  app.use("/internal/health-check", internalHealthCheck());
  app.get("/internal/swagger.yaml", (req, res) =>
    res.sendFile("./swagger.yaml", { root: __dirname })
  );
  app.use(getPokemonErrorMiddleware);
  app.get("/api/pokemon/:pokemonNameOrId", getPokemon);

  const port = process.env.PORT || 3000;
  // tslint:disable-next-line: no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
};
