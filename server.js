const express = require('express')
const { urlencoded, json } = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const moment = require('moment')
const xlxs = require('excel4node')
const fs = require('fs')
const cors = require('cors')
//Config

const app = express()

// //Session
// app.use(session({
//     secret: "modifications_App_of_Eletronic_Maintance_UV09_TK_Brazil",
//     resave: true,
//     saveUninitialized: true
// }))


//Cors
app.use(cors())

//DotEnv
const PORT = process.env.PORT || 8081

//Body Parser
app.use(urlencoded({extended: true}))
app.use(json())

//System logs
//Create a log archive
const log = fs.createWriteStream(path.join(__dirname, '/server/logs', `system${moment().format('DD-MM-YYYY')}.log`), {flags: 'a'})
//Store the logs in the archive created by previous line
// app.use(morgan('dev', {stream: log}))

app.use('/', require('./server/routes/routes'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})