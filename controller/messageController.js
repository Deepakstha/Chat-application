const db = require("../model/index")
const Op = require('sequelize').Op;

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const chat = [from, to].toString()
        const data = await db.message.create({
            message,
            chatUsers: chat,
            sender: from,
            reciver: to
        })
        if (data) { return res.json({ message: "Message Sent" }) } else {
            return res.status(401).send("Error Sending Message!")
        }
    } catch (error) {
        next(error)
    }

}
const getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body
        const chat = [from, to].toString()
        const chat1 = [to, from].toString()

        const messages = await db.message.findAll({ where: { chatUsers: { [Op.or]: [chat, chat1] } } })
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() == from,
                message: msg.message

            }
        })
        res.json(projectedMessages)
    } catch (error) {
        next(error)
    }
}

module.exports = { addMessage, getMessage }