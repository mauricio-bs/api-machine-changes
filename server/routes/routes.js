const express = require('express')
const route = express.Router()
//Controllers
const User = require('../controller/userController')
const Machine = require('../controller/machineController')
// const Components = require('../controller/componentController')
// const Changes = require('../controller/modController')
// const Buildings = require('../controller/buildController')
const Manage = require('../controller/manageController.js')

// route.post('/api/login', User.login)
// route.post('/api/logout', User.logout)
//User
route.get('/api/users', User.index)
route.post('/api/users/create', User.create)
route.get('/api/users/details/:_id', User.details)
route.put('/api/users/update/:_id', User.update)
route.post('/api/users/delete/:_id', User.delete)

//Management
//Roles
route.get('/api/manage/role', Manage.roleIndex)
route.post('/api/manage/role/create', Manage.roleCreate)

//Shift
route.get('/api/manage/shift', Manage.shiftIndex)

//Manufacturer
route.get('/api/manage/manufacturer', Manage.manIndex)

//Machine
route.get('/api/machine', Machine.index)
route.post('/api/machine/create', Machine.create)
route.get('/api/machine/details/:_id', Machine.details)
route.put('/api/machine/update/:_id', Machine.update)
route.post('/api/machine/delete/:_id', Machine.delete)

//Components


//Build

module.exports = route