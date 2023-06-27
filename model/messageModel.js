module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("message", {
        message: {
            type: DataTypes.STRING
        },
        chatUsers: {
            type: DataTypes.STRING,
        },
        sender: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        reciver: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }

        }
    })
    return Message
}