const db = require("../../connection/connection")
const { INTEGER, STRING } = require("sequelize")
//Models of machine components
const cnc = require('./CNC')
const driver = require( "./Driver" )
const ihm = require( "./IHM" )
const manufacturer = require( "./Manufacturer" )
const plc = require('./PLC')

const Machine = db.define('machine', {
    number: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        validate: {
           len: 6
        }
    },
    model: {
        type: STRING,
        allowNull: false
    },
    func: { //Fresa, Torno, Tempera e etc.
        type: STRING,
        allowNull: false
    },
    cnc: {
        type: INTEGER,
        references: {
            model: cnc,
            key: 'id'
        }
    },
    driver: {
        type: INTEGER,
        references: {
            model: driver,
            key: 'id'
        }
    },
    ihm: {
        type: INTEGER,
        references: {
            model: ihm,
            key: 'id'
        }
    },
    plc: {
        type: INTEGER,
        references: {
            model: plc,
            key: 'id'
        }
    },
    manufacturer: {
        type: INTEGER,
        references: {
            model: manufacturer,
            key: 'id'
        }
    }
})

module.exports = Machine