const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/passwordHandler")
const { generateToken } = require("../helpers/tokenHandler")

let access_token;
let userRole;

beforeAll(async (done) => {
    const user = [
      {
        username: "administrator",
        role: "superAdmin",
        email: "admin@showcarpedia.com",
        password: hashPassword("administrator"),
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "jeremiah",
        email: "jeremiah@showcarpedia.com",
        password: hashPassword("jeremiah"),
        role: "admin",
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "caca",
        email: "caca@showcarpedia.com",
        password: hashPassword("caca12345"),
        role: "user",
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
   
    try {
      const dataAdmin = await queryInterface.bulkInsert("Users", user, {
        returning: true,
      });
      
      username = dataAdmin[0].username;
      userRole = dataAdmin[0].role;
      access_token = await generateToken({
        id: dataAdmin[0].id,
        email: dataAdmin[0].email,
        role: dataAdmin[0].role,
      });
      
      done();
    } catch (error) {
      done(error);
    }
    console.log(access_token, "Tokennya nih")
});

  afterAll(async (done) => {
    try {
      await queryInterface.bulkDelete("Users");
      done();
    } catch (error) {
      done(error);
    }
});

describe("GET /v1/insights/usersTotal", () => {
    test("TEST CASE 1: Get Insights of Users Total Data", (done) => {
      request(app)
        .get("/v1/insights/usersTotal")
        .set("Cookie", [`access_token=${access_token}`, `role=${userRole}`])
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("usersTotal", expect.any(Number));
          done();
        });
    });
  });