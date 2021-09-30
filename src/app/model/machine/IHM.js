import Sequelize, { Model } from 'sequelize'

class IHM extends Model {
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
    this.hasMany(models.Machine, { foreignKey: 'ihm_id', as: 'machine_ihm' })
    this.belongsTo(models.Manufacturer)
    this.belongsTo(models.Software)
  }
}

export default IHM
