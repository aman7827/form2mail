import request from "supertest";
import app from "../app.js";

describe("Health Check", () => {
  test("GET /health", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
  });
});
