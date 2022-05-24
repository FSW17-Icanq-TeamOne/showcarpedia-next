const {ProductController} = require("../../controllers")

const productRouter = require("express").Router()

productRouter.get("/",ProductController.getAllProduct)

module.exports = productRouter