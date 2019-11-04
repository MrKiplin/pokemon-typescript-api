import { ErrorRequestHandler, Request, Response } from "express";
import { PokemonNotFound } from "../../pokemon-service/error.pokemon-not-found";

// TODO: Investigate why errors not trowing correctly on get-pokemon endpoint.
export const getPokemonErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: any
): ErrorRequestHandler => {
  const pokemonNameOrId = req.params.pokemonNameOrId;

  // TODO: If request is blank (i.e no pokemon id or name given) throw 400 NoDetailsGiven.
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
  return next(error);
};
