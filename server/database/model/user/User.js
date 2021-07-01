const { BOOLEAN, STRING, INTEGER, ENUM } = require("sequelize")
const db = require("../../connection/connection")
const shift = require("./shift")
const role = require('./role')

const user = db.define("user", {
	name: {
		type: STRING,
		allowNull: false,
	},
	id8: {
		type: INTEGER,
		allowNull: false,
		unique: true,
		validate: {
			len: 8,
		},
	},
	password: {
		type: STRING,
		allowNull: false
	},
	email: {
		type: STRING,
		validate: {
			isEmail: true,
			contains: "thyssenkrupp.com",
		},
	},
	role: {
		type: INTEGER,
		allowNull: false,
		references: {
			model: role,
			key: 'id',
		},
	},
	shift: {
		type: INTEGER,
		allowNull: false,
		references: {
			model: shift,
			key: "id",
		},
	},
	active: {
		type: BOOLEAN,
		defaultValue: true,
	},
	access: {
		type: ENUM,
		alllowNull: false,
		values: [1, 2, 3, 4], // ["Administrador", "Supervisor", "Encarregado", "Tecnico"]
		defaultValue: 4,
	},
})

module.exports = user