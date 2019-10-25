import * as request from "supertest";
import { setupApplication } from "./index";

describe("rest-api", () => {
  it("Should return true for health check", async done => {
    request(await setupApplication())
      .get("/internal/health-check")
      .expect(200, { healthy: true })
      .end(done);
  });

  // it("Should get pokemon", async done => {
  //   request(await setupApplication())
  //     .get("/api/pokemon/")
  //     .send({ pokemonNameOrId: 1 })
  //     .set("Accept", "application/json")
  //     // .expect("Content-Type", /json/)
  //     .expect(200, { id: 1 }, done);
  // });
});
