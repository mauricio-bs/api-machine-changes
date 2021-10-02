import Sequelize, { Model } from 'sequelize'

class MachineFunction extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.hasOne(models.Machine, {
      foreignKey: 'machine_duty_id',
      as: 'machine_duty',
    })
  }
}

export default MachineFunction
