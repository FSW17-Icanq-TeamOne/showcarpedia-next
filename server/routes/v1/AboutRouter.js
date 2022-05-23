const aboutRouter = require("express").Router()
const {AboutController} = require("../../controllers")
const authorization = require("../../middleware/authorization")

aboutRouter.get("/", AboutController.readAbout)
aboutRouter.use("/", authorization)
aboutRouter.post("/",AboutController.updateAbout)
module.exports = aboutRouter