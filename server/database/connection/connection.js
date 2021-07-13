const Sequelize = require("sequelize")
const sequelize = new Sequelize("dbtest", "development", "Noukchott@1679", {
	dialect: "mysql",
	host: "localhost",
})

sequelize.authenticate()
	.then(() => {
		console.log("Connection has been estabilished successfully")
	})
	.catch((error) => {
		console.error("Unable too connect to the database: ", error)
	})

module.exports = sequelize