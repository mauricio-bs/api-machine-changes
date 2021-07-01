const { STRING, TIME, INTEGER } = require("sequelize")
const db = require("../../connection/connection")
const user = require('./user')

const shift = db.define("shift", {
    name: {
        type: STRING,
        allowNull: false,
    },
    start: {
        type: TIME,
        allowNull: false
    },
    end: {
        type: TIME,
        allowNull: false
    },
    sponsor: {
        type: INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    }
})

module.exports = shift