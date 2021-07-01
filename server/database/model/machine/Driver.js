const { INTEGER, STRING } = require("sequelize")
const db = require("../../connection/connection")
const manufacturer = require('./Manufacturer')

const Driver = db.define('driver', {
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

module.exports = Driver