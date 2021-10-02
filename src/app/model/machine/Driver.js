import Sequelize, { Model } from 'sequelize'

class Driver extends Model {
  static init(sequelize) {
    super.init(
      {
        model: Sequelize.STRING,
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
    this.belongsTo(models.Manufacturer)
  }
}

export default Driver
