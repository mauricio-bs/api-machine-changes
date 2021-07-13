const { DataTypes } = require("sequelize")
const db = require("../../connection/connection")
const build = require('./Build')


const Line = db.define('line', {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    alternName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    build: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: build,
            key: 'id'
        }
    }
})

module.exports = Line