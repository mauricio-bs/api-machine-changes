import Sequelize, { Model } from 'sequelize'

class Line extends Model {
  static init(sequelize) {
    super.init(
      {
        nickname: Sequelize.STRING,
        alternative_name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Building)
    this.hasOne(models.Machine, { foreignKey: 'line_id', as: 'line' })
  }
}

export default Line
