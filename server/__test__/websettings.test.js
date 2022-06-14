const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/passwordHandler")

let username;
let email;
const password = "administrator";

beforeAll(async (done) => {
    const admin = [
      {
        username: "administrator",
        role: "superAdmin",
        email: "admin@showcarpedia.com",
        password: hashPassword("administrator"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    try {
      const data = await queryInterface.bulkInsert("Users", admin, {
        returning: true,
      });
      username = data[0].username;
      email = data[0].email;
      done()
    } catch (error) {
      done(error);
    }
  });

  afterAll(async (done) => {
    try {
      await queryInterface.bulkDelete("Users");
      done();
    } catch (error) {
      done(error);
    }
  });

  describe("POST /v1/login", () => {
    //login success
    test("TEST CASE 1: LOGIN SUCCESS", (done) => {
      request(app)
        .post("/v1/login")
        .send({ username, password })
        .end(function (err, res) {
          if (err) return done(err);
          const { status, body } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Success");
          expect(body).toHaveProperty("access_token", expect.any(String));
          expect(body).toHaveProperty("role", "superAdmin");
        //   expect(body).toHaveProperty("id", expect.any(Number));
        //   expect(body).toHaveProperty("username", username);
        //   expect(body).toHaveProperty("email", email);
          done();
        });
    });
})