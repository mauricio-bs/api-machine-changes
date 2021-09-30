import Sequelize, { Model } from 'sequelize'

class Driver extends Model {
  static init(sequelize) {
    super.init(
      {
        model: Sequelize.STRING,
        manufacturer: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.hasMany(models.Machine, {
      foreignKey: 'driver_id',
      as: 'machine_driver',
    })
  }
}

export default Driver
