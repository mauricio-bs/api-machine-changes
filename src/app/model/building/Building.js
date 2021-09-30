import Sequelize, { Model } from 'sequelize'

class Building extends Model {
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
    this.hasMany(models.Line, { foreignKey: 'building_id', as: 'building' })
  }
}
export default Building
