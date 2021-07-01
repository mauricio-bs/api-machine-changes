const db = require("../../connection/connection")
const { STRING, TEXT } = require("sequelize")

const Manufacturer = db.define('manufacturer', {
    name: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: STRING,
    },
    desc: {
        type: TEXT
    },
    productsCat: []
})

module.exports = Manufacturer