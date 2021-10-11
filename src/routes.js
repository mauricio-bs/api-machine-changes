import { Router } from 'express'
const app = Router()

// Controllers
// Session
import SessionController from './app/controller/SessionController'
//Users
import UserController from './app/controller/UserController'
import RoleController from './app/controller/RoleController'
import ShiftController from './app/controller/ShiftController'
// Locations
import BuildingController from './app/controller/BuildingController'
import LineController from './app/controller/LineController'
// Machine informations
import MachineController from './app/controller/MachineController'
import ManufacturerController from './app/controller/ManufacturerController'
import SoftwareController from './app/controller/SoftwareController'
// Machine Components
import CNCController from './app/controller/CncController'
import PlcController from './app/controller/PlcController'
import IhmController from './app/controller/IhmController'
import DriverController from './app/controller/DriverController'
// Maintences
import Maintences from './app/controller/MaintenceController'

app.post('/api/login', SessionController.store)
// app.post('/api/logout', SessionController.delete)

// User
app.get('/api/users', UserController.index)
app.get('/api/users/details/:_id', UserController.show)
app.post('/api/users/create', UserController.store)
app.put('/api/users/update/:_id', UserController.update)

// Management
// Roles
app.get('/api/manage/role', RoleController.index)
app.post('/api/manage/role/create', RoleController.store)

// Shift
app.get('/api/manage/shift', ShiftController.index)

// Manufacturer
// app.get('/api/manage/manufacturer', ManufacturerController.index)

// Machine
app.get('/api/machine', MachineController.index)
app.get('/api/machine/details/:_id', MachineController.show)
app.post('/api/machine/create', MachineController.store)
app.put('/api/machine/update/:_id', MachineController.update)
app.post('/api/machine/delete/:_id', MachineController.delete)

// Components
// Build

export default app
