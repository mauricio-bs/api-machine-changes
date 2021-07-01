const { INTEGER, STRING, ABSTRACT} = require("sequelize")
const db = require("../../database/connection")
const manufacturer = require( "./Manufacturer" )

const Software = db.define('software', {
    name: {
        type: STRING,
        allowNull: false,
    },
    version: {
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
    },
    class: {
        type: ABSTRACT,
        allowNull: false
    }
})

module.exports = Software