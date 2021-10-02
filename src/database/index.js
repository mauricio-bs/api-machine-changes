import Sequelize from 'sequelize'
import configDB from '../config/database'
// Models
/* User */
import User from '../app/model/user/User'
import Shift from '../app/model/user/Shift'
import Role from '../app/model/user/Role'
/* Building */
import Line from '../app/model/building/Line'
import Building from '../app/model/building/Building'
/* Machines */
import Machines from '../app/model/machine/Machine'
import MachineFunction from '../app/model/machine/MachineFunction'
/* Manufacturer */
import Manufacturer from '../app/model/machine/Manufacturer'
import ManufacturerCategory from '../app/model/machine/ManufacturerCategory'
/* Components */
/* CNC */
import CNC from '../app/model/machine/CNC'
/* PLC */
import PLC from '../app/model/machine/PLC'
/* IHM */
import IHM from '../app/model/machine/IHM'
/* Driver */
import Driver from '../app/model/machine/Driver'
/* Software */
import Software from '../app/model/machine/Software'

const models = [
  User,
  Shift,
  Role,
  Building,
  Line,
  Manufacturer,
  Machines,
  CNC,
  PLC,
  Driver,
  IHM,
  Software,
  MachineFunction,
  ManufacturerCategory,
]

class Database {
  constructor() {
    this.init()
  }

  init(model) {
    this.connection = new Sequelize(configDB)
    models
      .map((model) => model.init(this.connection))
      .map(model.associate && model.init(this.connection.models))
  }
}

export default new Database()
