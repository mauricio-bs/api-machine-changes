const { DataTypes } = require("sequelize")
const db = require("../../connection/connection")

const Build = db.define('build', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Build