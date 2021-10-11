import Sequelize, { Model } from 'sequelize'

// Unfinished model

class ManufacturerCategory extends Model {
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
    this.hasMany(models.Manufacturer, {
      foreignKey: 'manufacturer_category_id',
      as: 'manufacturer_category',
    })
  }
}

export default ManufacturerCategory
