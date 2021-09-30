import Sequelize, { Model } from 'sequelize'

class PLC extends Model {
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
    this.hasMany(models.Machine, { foreignKey: 'plc_id', as: 'plc' })
    this.belongsTo(models.Manufacturer)
  }
}

export default PLC
