import Sequelize, { Model } from 'sequelize'

class Shift extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        start_time: Sequelize.TIME,
        end_time: Sequelize.TIME,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.hasOne(models.User, { foreignKey: 'shift_id', as: 'shift' }) // User shift
    this.belongsTo(models.User)
  }
}

export default Shift
