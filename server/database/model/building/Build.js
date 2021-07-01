const { STRING, INTEGER } = require("sequelize")
const db = require("../database/connection")

const Build = db.define('build', {
    name: {
        type: STRING,
        allowNull: false
    }
})

module.exports = Build