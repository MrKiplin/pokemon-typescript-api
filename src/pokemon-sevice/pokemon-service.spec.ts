import axios from "axios";
import * as nock from "nock";
import { PokemonService } from "./pokemon-service";

describe("PokemonService", () => {
  const baseURL = "http://dummy-base-url";
  let service: PokemonService;

  beforeEach(() => {
    const client = axios.create({
      baseURL
    });
    service = new PokemonService(client);
  });

  it("Should call the pokemon api endpoint when getting pokemon info", async () => {
    const requestPokemon = nock(baseURL)
      .get("/pokemon/test-pokemon-name")
      .reply(200, {
        id: 1,
        name: "test-pokemon-name",
        types: [
          {
            slot: 1,
            type: { name: "test-pokemon-type", url: "test-url" }
          }
        ]
      });

    const result = await service.getPokemonInfo("test-pokemon-name");

    expect(requestPokemon.isDone()).toBe(true);
    expect(result).toMatchObject({
      id: 1,
      name: "test-pokemon-name",
      types: ["test-pokemon-type"]
    });
  });

  it("Should throw PokemonNotFound exception when getPokemonInfo() returns 404", async () => {
    nock(baseURL)
      .get("/pokemon/test-pokemon-name")
      .reply(404);

    await expect(
      service.getPokemonInfo("test-pokemon-name")
    ).rejects.toThrowError("Pokemon cannot be found: test-pokemon-name");
  });

  it("Should throw Error when getPokemonInfo() returns 500", async () => {
    nock(baseURL)
      .get("/pokemon/test-pokemon-name")
      .reply(500);

    await expect(
      service.getPokemonInfo("test-pokemon-name")
    ).rejects.toThrowError(
      "Error retrieving pokemon details for: test-pokemon-name"
    );
  });
});
