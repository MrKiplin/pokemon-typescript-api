import axios from "axios";
import { NextFunction, Request, Response } from "express";
import * as express from "express";
import { getPokemonErrorMiddleware } from "../middleware/get-pokemon-error-middleware";
import { PokemonService } from "../pokemon-service/pokemon-service";

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

export const getPokemonRoute = express.Router();

getPokemonRoute.use(getPokemonErrorMiddleware);
getPokemonRoute.get("/:pokemonNameOrId", getPokemon);
