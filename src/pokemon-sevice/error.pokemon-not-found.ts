export class PokemonNotFound extends Error {
  constructor(pokemonNameOrID: string | number) {
    super(`Pokemon cannot be found: ${pokemonNameOrID}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PokemonNotFound.prototype);
  }
}
