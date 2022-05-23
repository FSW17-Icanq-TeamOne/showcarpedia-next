const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3001 | process.env.PORT
const router = require("./routes")
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
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
        console.log('User connected')
        socket.join(room)
        console.log(room)
    })

    socket.on('sendMsg',({name, room, msg}) => {
        socket.join(room)
        console.log('ini room',room)
        console.log(name, room, msg)
        io.to(room).emit('message', {
            user: name,
            text: msg
        })
        // callback()
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
        // const user = delUser(socket.id)
        // if (user) {
        //     io.to(user.room).emit('notification', 
        //     {
        //         title: 'Someone just left',
        //         description: `${user.name} just left the room`
        //     })
        //     io.to(user.room).emit('users', getUsers(user.room))
        // }
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

server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
}) 