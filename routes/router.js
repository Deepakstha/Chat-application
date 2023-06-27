const routes = require("express").Router()
const { signupUser, loginUser, getAllUser } = require("../controller/userController")

routes.post("/signup", signupUser)
routes.post("/login", loginUser)
routes.get("/allUser/:id", getAllUser)

module.exports = routes