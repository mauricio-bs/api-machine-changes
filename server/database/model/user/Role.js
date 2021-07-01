const { STRING } = require('sequelize')
const db = require('../../connection/connection')

const role = db.define('role', {
    name: {
        type: STRING,
        allowNull: false
    }
})

module.exports = role