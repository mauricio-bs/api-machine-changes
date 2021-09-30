import Sequelize, { Model } from 'sequelize'

class CNC extends Model {
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
    this.hasMany(models.Machine, { foreignKey: 'cnc_id', as: 'machine_cnc' })
    this.belongsTo(models.Manufacturer)
  }
}

export default CNC
