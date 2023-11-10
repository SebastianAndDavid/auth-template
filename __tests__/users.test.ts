import request from "supertest";
import app from "../src/app";

describe("backend author routes", () => {
  const agent = request.agent(app);
  it("#POST creates a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@test.com", password: "123456" });
    expect(res.status).toBe(200);
  });

  it.only("#GET/#id returns a user", async () => {
    const user = {
      email: "test@test.com",
      id: 1,
    };
    const res = await agent.get(`users/${user.id}`);
    expect(res.status).toBe(200);
  });
});
