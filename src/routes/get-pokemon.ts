import axios from "axios";
import * as express from "express";
import { PokemonNotFound } from "../pokemon-service/error.pokemon-not-found";
import { Pokemon } from "../pokemon-service/pokemon";
import { PokemonService } from "../pokemon-service/pokemon-service";
const router = express.Router();

export const getPokemon = async (
  req: any,
  res: any,
  next: any
): Promise<Pokemon> => {
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

export const errorMiddleware = (error: any, req: any, res: any, next: any) => {
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

router.get("/:pokemonNameOrId", getPokemon, errorMiddleware);
