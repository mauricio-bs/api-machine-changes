const { STRING, INTEGER } = require("sequelize")
const db = require("../../connection/connection")
const manufacturer = require('./Manufacturer')

const Cnc = db.define('cnc', {
    model: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    manufacturer: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: manufacturer,
            key: 'id'
        }
    },
})

module.exports = Cnc