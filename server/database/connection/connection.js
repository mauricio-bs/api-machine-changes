const Sequelize = require("sequelize")
const sequelize = new Sequelize("database", "username", "password", {
	dialect: "mysql",
	host: "db_locate",
})

sequelize.authenticate()
	.then(() => {
		console.log("Connection has been estabilished successfully")
	})
	.catch((error) => {
		console.error("Unable too connect to the database: ", error)
	})

module.exports = sequelize