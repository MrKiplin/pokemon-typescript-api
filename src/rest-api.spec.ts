import * as request from "supertest";
import { setupApplication } from "./index";

describe("rest-api", () => {
  it("Should return true for health check", async () =>
    request(await setupApplication())
      .get("/internal/health-check")
      .expect("Content-Type", /json/)
      .expect(200, { healthy: true }));

  it("Should get pokemon by id", async () =>
    request(await setupApplication())
      .get("/api/pokemon/1/")
      .expect("Content-Type", /json/)
      .expect(200, {
        pokemonInfo: { id: 1, name: "bulbasaur", types: ["poison", "grass"] }
      }));

  it("Should get pokemon by name", async () =>
    request(await setupApplication())
      .get("/api/pokemon/bulbasaur/")
      .expect("Content-Type", /json/)
      .expect(200, {
        pokemonInfo: { id: 1, name: "bulbasaur", types: ["poison", "grass"] }
      }));
});
