const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3001 | process.env.PORT
const router = require("./routes")
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3001",
        credentials: true,
        methods: ["GET", "POST"]
    }
})

var corsOpts = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}


//Socket.IO
io.on('connection', (socket) => {
    socket.on('login', ({room}) => {
        socket.join(room)
    })

    socket.on('sendMsg',({name, room, msg}) => {
        io.to(room).emit('message', {
            user: name,
            text: msg
        })
    })

    socket.on('disconnect', () => {  
    })

})
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