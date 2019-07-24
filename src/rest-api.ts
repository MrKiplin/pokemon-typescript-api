import axios from "axios";
import * as express from "express";
import { PokemonNotFound } from "./pokemon-service/error.pokemon-not-found";
import { Pokemon } from "./pokemon-service/pokemon";
import { PokemonService } from "./pokemon-service/pokemon-service";

export const getPokemon = async (req, res, next): Promise<Pokemon> => {
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

export const errorMiddleware = (
  error,
  req,
  res,
  next
): express.ErrorRequestHandler => {
  const pokemonNameOrId = req.params.pokemonNameOrId;

  if (res.headersSent) {
    return next(error);
  }
  if (error instanceof PokemonNotFound) {
    res.status(404).json({
      code: 404,
      message: `Error retrieving pokemon details for: ${pokemonNameOrId}`
    });
    return next(error);
  }
  res.status(500).json({
    code: 500,
    message: "Internal error"
  });
  next(error);
};

export const createRestApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/.well-known/health-check", res => res.json({ healthy: true }));
  app.get("/.well-known/swagger.yaml", res =>
    res.sendFile("./swagger.yaml", { root: __dirname })
  );
  app.get("/api/pokemon/:pokemonNameOrId", getPokemon, errorMiddleware);

  const port = process.env.PORT || 3000;
  // tslint:disable-next-line: no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
};
