const db = require("../../connection/connection")
const { STRING, INTEGER } = require("sequelize")
const manufacturer = require( "./Manufacturer" )
const software = require('./Software')

const Ihm = db.define('ihm', {
    model: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    software: {
        type: INTEGER,
        references: {
            model: software,
            key: 'id'
        }
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

module.exports = Ihm