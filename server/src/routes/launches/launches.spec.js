const st = require("supertest");
const app = require("../../app");
const { connectToMongo, disconnectMongo } = require("../../services/mongo");

describe("Testing launches api", () => {
  beforeAll(async () => await connectToMongo());
  describe("get launches api", () => {
    test("It shouldrespond with 200", async () => {
      await st(app).get("/launches").expect(200).expect("Content-Type", /json/);
      // expect(res.statusCode).toBe(200);
    });
  });

  describe("add new launch api", () => {
    const testLaunch = {
      mission: "test-mission",
      rocket: "test-rocket",
      target: "Kepler-62 f",
      launchDate: "May 23,1997",
    };
    const testLaunchWithoutDate = {
      mission: "test-mission",
      rocket: "test-rocket",
      target: "Kepler-62 f",
    };
    const testLaunchWithInvalidDate = {
      mission: "test-mission",
      rocket: "test-rocket",
      target: "Kepler-62 f",
      launchDate: "test",
    };
    // using super test
    test("It should respond with 201 created", async () => {
      const res = await st(app)
        .post("/launches")
        .send(testLaunch)
        .expect(201)
        .expect("Content-Type", /json/);
      // expect(res).toBe(200);

      // using JEST assertions
      expect(res.body).toMatchObject(testLaunchWithoutDate);
      const requestLaunchDate = new Date(testLaunch.launchDate).valueOf();
      const responseLaunchDate = new Date(res.body.launchDate).valueOf();
      expect(responseLaunchDate).toBe(requestLaunchDate);
    });
    test("It should catch missing properties error", async () => {
      const res = await st(app)
        .post("/launches")
        .send(testLaunchWithoutDate)
        .expect(400);

      expect(res.body.error).toMatch("Missing required Launch properties");
    });
    test("It should catch invalid date error", async () => {
      const res = await st(app)
        .post("/launches")
        .send(testLaunchWithInvalidDate)
        .expect(400);

      expect(res.body).toStrictEqual({ error: "Invalid Launch date" });
    });
  });
  afterAll(async () => await disconnectMongo());
});
