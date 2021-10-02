import Sequelize, { Model } from 'sequelize'

// Unfinished model

class ManufacturerCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        category: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {}
}

export default ManufacturerCategory
