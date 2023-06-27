const express = require("express")
const cors = require("cors")
const routes = require("./routes/router")
const messageRoutes = require("./routes/messageRoutes")
const app = express()
const socket = require("socket.io")
require("dotenv").config()
require("./model/index")

app.use(cors())
app.use(express.json())
app.use("/api/auth", routes)
app.use("/api/messages", messageRoutes)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is starting in http://localhost:${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
})

global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on("addUser", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved", data.message)
        }
    })
})