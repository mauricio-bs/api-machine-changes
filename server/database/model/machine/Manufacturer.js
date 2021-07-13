const db = require("../../connection/connection")
const { DataTypes } = require("sequelize")

const Manufacturer = db.define('manufacturer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
    },
    desc: {
        type: DataTypes.TEXT
    },
    productsCat: {
        type: DataTypes.ABSTRACT
    }
})

module.exports = Manufacturer