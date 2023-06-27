const dbConfig = require("../config/dbConfig")
const { Sequelize, DataTypes, QueryTypes } = require("sequelize")
// const bcrypt

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
})

try {
    sequelize.authenticate()
    console.log("Database Connected Successfully!")
} catch (error) {
    console.log("Unable to connecte Database")
}

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.user = require("./userModel")(sequelize, DataTypes)
db.message = require("./messageModel")(sequelize, DataTypes)

db.sequelize.sync({ force: false })
module.exports = db
