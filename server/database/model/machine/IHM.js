const db = require("../../connection/connection")
const { DataTypes } = require("sequelize")
const manufacturer = require( "./Manufacturer" )
const software = require('./Software')

const Ihm = db.define('ihm', {
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    software: {
        type: DataTypes.INTEGER,
        references: {
            model: software,
            key: 'id'
        }
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

module.exports = Ihm