const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require("./routes")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use(router)
module.exports = app
// server.listen(PORT, () => { console.log(`Listening on port http://localhost:${PORT}`)})
