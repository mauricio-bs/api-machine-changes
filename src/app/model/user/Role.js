import Sequelize, { Model } from 'sequelize'

class Role extends Model {
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
    this.hasOne(models.User, { foreignKey: 'shift_id', as: 'shift' })
  }
}

export default Role
