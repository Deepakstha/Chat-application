const routes = require("express").Router()
const { addMessage, getMessage } = require("../controller/messageController")

routes.post("/addmsg", addMessage)
routes.post("/getmsg", getMessage)


module.exports = routes