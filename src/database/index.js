import Sequelize from 'sequelize'
import configDB from '../config/database'
// Models
/* User */
import User from '../app/model/user/User'
import Role from '../app/model/user/Role'
import Shift from '../app/model/user/Shift'
/* Location */
import Line from '../app/model/building/Line'
import Building from '../app/model/building/Building'
/* Machines */
import Machines from '../app/model/machine/Machine'
import MachineFunction from '../app/model/machine/MachineFunction'
/* Manufacturer */
import Manufacturer from '../app/model/manufacturer/Manufacturer'
import ManufacturerEmail from '../app/model/manufacturer/ManufacturerEmail'
import ManufacturerPhone from '../app/model/manufacturer/ManufacturerPhone'
import ManufacturerCategory from '../app/model/manufacturer/ManufacturerCategory'
/* Components */
import CNC from '../app/model/machine/CNC'
import PLC from '../app/model/machine/PLC'
import IHM from '../app/model/machine/IHM'
import Driver from '../app/model/machine/Driver'
import Software from '../app/model/machine/Software'
/* Maintences */
import Maintence from '../app/model/Maintence'

const models = [
  User,
  Role,
  Shift,
  Line,
  Building,
  CNC,
  PLC,
  IHM,
  Driver,
  Software,
  Machines,
  MachineFunction,
  Manufacturer,
  ManufacturerEmail,
  ManufacturerPhone,
  ManufacturerCategory,
  Maintence,
]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDB)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
