import Sequelize, { Model } from 'sequelize'

class ManufacturerEmail extends Model {
  static init(sequelize) {
    super.init(
      {
        owner_name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.hasMany(models.Manufacturer, {
      foreignKey: 'email_id',
      as: 'contact_email',
    })
  }
}

export default ManufacturerEmail
