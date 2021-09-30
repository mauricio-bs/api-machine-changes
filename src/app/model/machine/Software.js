import Sequelize, { Model } from 'sequelize'

class Software extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        version: Sequelize.STRING,
        manufacturer: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.hasOne(models.IHM, { foreignKey: 'software_id', as: 'ihm_software' })
    this.hasMany(models.Machine, { foreignKey: 'software_id', as: 'software' })
    this.belongsTo(models.Manufacturer, {
      foreignKey: 'manufacturer_id',
      as: 'manufacturer',
    })
  }
}

export default Software
