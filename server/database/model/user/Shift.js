const { DataTypes } = require("sequelize")
const db = require("../../connection/connection")
const user = require('./user')

const shift = db.define("shift", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end: {
        type: DataTypes.TIME,
        allowNull: false
    },
    sponsor: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    }
})

module.exports = shift