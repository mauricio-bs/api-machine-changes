const db = require('../../connection/connection')
const { DataTypes } = require("sequelize")
//Models of machine components
const cnc = require('./CNC')
const driver = require( "./Driver" )
const ihm = require( "./IHM" )
const manufacturer = require( "./Manufacturer" )
const plc = require('./PLC')

const Machine = db.define('machine', {
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
           len: 6
        }
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    func: { //Fresa, Torno, Tempera e etc.
        type: DataTypes.STRING,
        allowNull: false
    },
    cnc: {
        type: DataTypes.INTEGER,
        references: {
            model: cnc,
            key: 'id'
        }
    },
    driver: {
        type: DataTypes.INTEGER,
        references: {
            model: driver,
            key: 'id'
        }
    },
    ihm: {
        type: DataTypes.INTEGER,
        references: {
            model: ihm,
            key: 'id'
        }
    },
    plc: {
        type: DataTypes.INTEGER,
        references: {
            model: plc,
            key: 'id'
        }
    },
    manufacturer: {
        type: DataTypes.INTEGER,
        references: {
            model: manufacturer,
            key: 'id'
        }
    }
})

module.exports = Machine