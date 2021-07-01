const {STRING, INTEGER, ENUM, BOOLEAN, NOW} = require('sequelize')
const db = require("../connection/connection")

const User = require('./user/User')
const machine = require('./machine/Machine')

const modification = db.define('modification', {
    description: {
        type: STRING,
        allowNull: false
    },
    type: {
        type: ENUM,
        values: ['Provisório', 'Definitiva'],
        allowNull: false
    },
    class: {
        type: ENUM,
        values: ['Redução de perda', 'Saúde']
    },
    swChanges: {
        type: BOOLEAN,
        allowNull: false,
        default: false
    },
    hwChanges: {
        type: BOOLEAN,
        allowNull: false,
        default: false
    },
    sponsorHWAnal: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    eleScheme: {
        type: BOOLEAN,
        defaultValue: false
    },
    sponsorSWAnal: {
        type: BOOLEAN,
        defaultValue: false
    },
    afctSecurity: {
        type: BOOLEAN,
        defaultValue: false
    },
    machine: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: machine,
            key: 'id'
        }
    },
    user: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    participant: {
        type: INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    sponsor: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    date: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW
    }
})

module.exports = modification