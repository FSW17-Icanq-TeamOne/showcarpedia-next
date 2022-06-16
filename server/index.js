const express = require("express")
const app = express()
const router = require("./routes")
const cors = require("cors")
// const PORT = 3001 | process.env.PORT

// const server = require('http').createServer(app)
var corsOpts = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}
//Utilities
const cookieParser = require('cookie-parser')

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.use(cors(corsOpts))

//Routes
app.use(router)

module.exports = app;
// server.listen(PORT, () => { console.log(`Listening on port http://localhost:${PORT}`)}) 