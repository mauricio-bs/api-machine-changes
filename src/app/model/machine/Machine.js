import Sequelize, { Model } from 'sequelize'

class Machine extends Model {
  static init(sequelize) {
    super.init(
      {
        number: Sequelize.NUMBER,
        model: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    // Informations
    this.belongsTo(models.MachineFunction)
    this.belongsTo(models.Manufacturer)
    // Components
    this.belongsTo(models.CNC)
    this.belongsTo(models.IHM)
    this.belongsTo(models.PLC)
    this.belongsTo(models.Driver)
    this.belongsTo(models.Software)
    // Modification
    this.hasOne(models.Maintence, {
      foreignKey: 'machine_id',
      as: 'machine',
    })
    // Location
    this.belongsTo(models.Line)
    this.belongsTo(models.Building)
  }
}

export default Machine
