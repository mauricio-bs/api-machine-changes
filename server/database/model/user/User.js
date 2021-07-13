const { DataTypes } = require("sequelize")
const db = require("../../connection/connection")
const shift = require("./shift")
const role = require('./role')

const user = db.define("user", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	id8: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		
	},
	role: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: role,
			key: 'id'
		}
	},
	shift: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: shift,
			key: "id",
		},
	},
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	access: {
		type: DataTypes.ENUM,
		alllowNull: false,
		values: ["Administrador", "Supervisor", "Encarregado", "Tecnico"], // [1, 2, 3, 4]
		defaultValue: "Tecnico",
	},
})

module.exports = user