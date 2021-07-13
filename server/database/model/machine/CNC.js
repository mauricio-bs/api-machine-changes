const { DataTypes } = require("sequelize")
const db = require("../../connection/connection")
const manufacturer = require('./Manufacturer')

const Cnc = db.define('cnc', {
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    manufacturer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: manufacturer,
            key: 'id'
        }
    },
})

module.exports = Cnc