const {DataTypes, DATE} = require('sequelize')
const db = require("../connection/connection")

const User = require('./user/User')
const machine = require('./machine/Machine')

const modification = db.define('modification', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['Provisório', 'Definitiva'],
        allowNull: false
    },
    class: {
        type: DataTypes.ENUM,
        values: ['Redução de perda', 'Saúde']
    },
    swChanges: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    },
    hwChanges: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    },
    sponsorHWAnal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    eleScheme: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    sponsorSWAnal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    afctSecurity: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    machine: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: machine,
            key: 'id'
        }
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    participant: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    sponsor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toLocaleDateString('pt-br')
    }
})

module.exports = modification