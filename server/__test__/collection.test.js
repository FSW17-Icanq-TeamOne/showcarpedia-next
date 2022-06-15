const request = require("supertest")
const app = require("../index")
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const {hashPassword} = require("../helpers/passwordHandler")
const {generateToken} = require("../helpers/tokenHandler")

let access_token
let productId
const product = [
  {
    title: "MobilAvanza",
    brand: "Toyota",
    year: 2021,
    kiloMeter: 10000,
    grade: 5,
    category: "Avanza",
    photoProducts: [
      "https://firebasestorage.googleapis.com/v0/b/react-upload-f84bf.appspot.com/o/multipleImages%2FThu%20Apr%2021%202022%2000%3A05%3A41%20GMT%2B0700%20(Western%20Indonesia%20Time)download%20(2).jpeg?alt=media&token=481d173f-2804-4c1a-ad72-44f99b62676a",
    ],
    description: "Murah Toyota Avanza",
    delete: false,
    videos: ["youtube.com"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const newProduct = {
  "title": "Mobil Itu",
  "brand": "Porsche",
  "year": 2021,
  "kiloMeter": 10000,
  "grade": 5,
  "category": "Porsche",
  "photoProducts": [
    "https://firebasestorage.googleapis.com/v0/b/react-upload-f84bf.appspot.com/o/multipleImages%2FThu%20Apr%2021%202022%2000%3A05%3A41%20GMT%2B0700%20(Western%20Indonesia%20Time)download%20(2).jpeg?alt=media&token=481d173f-2804-4c1a-ad72-44f99b62676a",
    "https://firebasestorage.googleapis.com/v0/b/react-upload-f84bf.appspot.com/o/multipleImages%2FThu%20Apr%2021%202022%2004%3A14%3A04%20GMT%2B0700%20(Western%20Indonesia%20Time)download%20(1).jpeg?alt=media&token=8af2e7c6-663a-4019-8ff8-09efce882df1",
    "https://firebasestorage.googleapis.com/v0/b/react-upload-f84bf.appspot.com/o/multipleImages%2FThu%20Apr%2021%202022%2004%3A14%3A04%20GMT%2B0700%20(Western%20Indonesia%20Time)download%20(2).jpeg?alt=media&token=fdcc1b0f-cdc1-4531-92cf-f2a8fda8d0aa",
  ],
  "description": "Murah Mobil itu",
  "delete": false,
  "videos": ["something.com"],
  "createdAt": new Date(),
  "updatedAt": new Date(),
}

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
  ]

  try {
    const dataUser = await queryInterface.bulkInsert("Users", user, {
      returning: true,
    })
    username = dataUser[0].username
    access_token = await generateToken({
      id: dataUser[0].id,
      email: dataUser[0].email,
      role: dataUser[0].role,
    })
    // productId = dataProduct.id
    done()
  } catch (error) {
    done(error)
  }
})

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Users")
    done()
  } catch (error) {
    done(error)
  }
})

describe("GET v1/cars", () => {
  afterEach(async (done) => {
    await queryInterface.bulkDelete("Products")
    done()
  })
  test("TEST CASE 1: GET ALL DATA SUCCESS", async (done) => {
    await queryInterface.bulkInsert("Products", product, {
      retuning: true,
    })
    request(app)
      .get("/v1/cars")
      .set("Cookie", [`access_token=${access_token}`])
      .end((err, res) => {
        if (err) return done(err)
        const {body, status} = res
        expect(status).toBe(200)
        expect(body).toEqual(expect.arrayContaining([]))
        done()
      })
  })
  test("TEST CASE 2: GET ALL DATA FAILED (NO DATA)", (done) => {
    request(app)
      .get("/v1/cars")
      .set("Cookie", [`access_token=${access_token}`])
      .end((err, res) => {
        if (err) return done(err)
        const {body, status} = res
        expect(status).toBe(400)
        expect(body).toMatch("please add new product")
        done()
      })
  })
})

describe("POST v1/cars", () => {
  test("TEST 3 CREATE PRODUCT SUCCESS", (done) => {
    request(app)
      .post("/v1/cars")
      .send(newProduct)
      .set("Cookie", [`access_token=${access_token}`])
      .end((err, res) => {
        if (err) return done(err)
        const {body, status} = res
        expect(status).toBe(201)
        expect(body).objectContaining({
          message: "Success",
          ...product,
        })
      })
    done()
  })

  test("TEST 1 CREATE PRODUCT FAILED (ACCESS TOKEN)" =>{
    request(app)
      .post("/v1/cars")
      .send(newProduct)
      .set("Cookie", [`access_token=${access_token}`])
      .end((err, res) => {
        if (err) return done(err)
        const {body, status} = res
        expect(status).toBe(201)
        expect(body).objectContaining({
          message: "Success",
          ...product,
        })
      })
    done()
  })
})