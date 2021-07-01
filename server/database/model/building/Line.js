const { STRING, INTEGER } = require("sequelize")
const db = require("../database/connection")
const build = require('./Build')


const Line = db.define('line', {
    nickname: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    alternName: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    build: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: build,
            key: 'id'
        }
    }
})

module.exports = Line