const sequelize = require('../../lib/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Postchat = sequelize.define('posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    body: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING, allowNull: false },
})


User.hasOne(Postchat)
Postchat.belongsTo(User)


module.exports = {
    User,
    Postchat
}