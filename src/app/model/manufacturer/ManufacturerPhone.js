import Sequelize, { Model } from 'sequelize'

class ManufacturerPhone extends Model {
  static init(sequelize) {
    super.init(
      {
        owner_name: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.hasMany(models.Manufacturer, {
      foreignKey: 'phone_id',
      as: 'contact_phone',
    })
  }
}

export default ManufacturerPhone
