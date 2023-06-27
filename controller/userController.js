const Op = require('sequelize').Op;
const db = require("../model/index")
const User = db.user
const bcrypt = require("bcrypt")

const signupUser = async (req, res, next) => {
    const { username, password, email } = req.body
    let user
    try {
        user = await User.findOne({
            where: {
                email: email
            }

        })

    } catch (error) {
        console.log(error)
    }
    if (user) {
        return res.json({ message: "User Already exist!", status: 201 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const new_user = await User.create({ username, email, password: hashedPassword })
    res.json({ message: "User Created!", status: 200, new_user })

}

const loginUser = async (req, res, next) => {

    // const { email, password } = req.body
    // let existingUser;
    // try {
    //     existingUser = await User.findOne({ where: { email: req.body.email } })
    // } catch (error) {
    //     console.log(error)
    // }
    // if (!existingUser) {
    //     return res.status(404).json({ message: "User not found" })
    // }
    // const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    // if (!isPasswordCorrect) {
    //     return res.status(400).json({ message: "Password is incorrect", isPasswordCorrect })
    // }

    // const token = jwt.sign({ id: existingUser.id }, JWT_SECRET_KEY, { expiresIn: "30d" })


    // return res.status(200).json({ message: "Succesfully login", isPasswordCorrect, user: existingUser, token })


    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        return res.json({ message: 'Invalid Email or Password', status: 403 })
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
        return res.json({ message: "Invalid Email or Password", status: 403 })
    } else {

        return res.json({ user, status: 200 })
    }

}

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: { id: { [Op.ne]: req.params.id } }
        })
        return res.json({ users })
    } catch (error) {
        next(error)
    }
}

module.exports = { signupUser, loginUser, getAllUser }