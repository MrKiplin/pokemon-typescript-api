import * as request from "supertest";
import { createRestApp } from "./rest-api";

describe("rest-api", () => {
  it("Should return true for health check", async () =>
    request(await createRestApp())
      .get("/internal/health-check")
      .expect("Content-Type", /json/)
      .expect(200, { healthy: true }));

  it("Should get pokemon by id", async () =>
    request(await createRestApp())
      .get("/api/pokemon/1/")
      .expect("Content-Type", /json/)
      .expect(200, {
        pokemonInfo: { id: 1, name: "bulbasaur", types: ["grass", "poison"] },
      }));

  it("Should get pokemon by name", async () =>
    request(await createRestApp())
      .get("/api/pokemon/bulbasaur/")
      .expect("Content-Type", /json/)
      .expect(200, {
        pokemonInfo: { id: 1, name: "bulbasaur", types: ["grass", "poison"] },
      }));

  it("Should return status 400 if pokemonNameOrId is blank", async () =>
    request(await createRestApp())
      .get("/api/pokemon/{pokemonNameOrId}")
      .expect("Content-Type", /json/)
      .expect(400, { code: 400, message: "No pokemon Name or ID provided" }));

  it("Should return status 404 if pokemonNameOrId is invalid", async () =>
    request(await createRestApp())
      .get("/api/pokemon/invalid-pokemon")
      .expect("Content-Type", /json/)
      .expect(404, {
        code: 404,
        message: "Error retrieving pokemon details for: invalid-pokemon",
      }));
});
