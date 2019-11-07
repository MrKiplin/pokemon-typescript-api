import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { PokemonNotFound } from "../../pokemon-service/error.pokemon-not-found";

export const getPokemonErrorMiddleware: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const pokemonNameOrId = req.params.pokemonNameOrId;

  if (res.headersSent) {
    return next(error);
  }

  if (pokemonNameOrId === "{pokemonNameOrId}") {
    res.status(400).json({
      code: 400,
      message: "No pokemon Name or ID provided"
    });
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
  return next(error);
};
