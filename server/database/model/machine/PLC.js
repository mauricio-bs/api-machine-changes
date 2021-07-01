const db = require("../../connection/connection")
const { STRING, INTEGER} = require("sequelize")
const manufacturer = require( "./Manufacturer" )

const Plc = db.define('plc', {
    model: {
        type: STRING,
        allowNull: false
    },
    manufacturer: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: manufacturer,
            key: 'id'
        }
    }
})

module.exports = Plc