import axios from "axios";
import { NextFunction, Request, RequestHandler, Response } from "express";
import * as express from "express";
import { PokemonService } from "../pokemon-service/pokemon-service";
import { getPokemonErrorMiddleware } from "./middleware/get-pokemon-error-middleware";

export const getPokemon: RequestHandler = async (
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

export const getPokemonRoute = express.Router();

getPokemonRoute.get("/:pokemonNameOrId", getPokemon, getPokemonErrorMiddleware);
