import { get } from "@ovotech/typesafe-get";
import { AxiosInstance } from "axios";
import { PokemonNotFound } from "./error.pokemon-not-found";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  types: PokemonType[];
}

export class PokemonService {
  constructor(private client: AxiosInstance) {}

  async getPokemonInfo(pokemonNameOrId: string | number): Promise<Pokemon> {
    try {
      const response = await this.client.get<PokemonApiResponse>(
        `/pokemon/${pokemonNameOrId.toString().toLowerCase()}`
      );
      const pokemon = response.data;
      const pokemonTypes: PokemonType[] = pokemon.types;

      const formattedPokemonTypes: string[] = pokemonTypes.map(
        pokemonType => pokemonType.type.name
      );

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: formattedPokemonTypes
      };
    } catch (error) {
      const responseCode = get(error, "response", "status");
      if (responseCode === 404) {
        throw new PokemonNotFound(pokemonNameOrId);
      }
      throw new Error(
        `Error retrieving pokemon details for: ${pokemonNameOrId}`
      );
    }
  }
}
