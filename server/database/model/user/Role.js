const { DataTypes } = require('sequelize')
const db = require('../../connection/connection')

const role = db.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = role