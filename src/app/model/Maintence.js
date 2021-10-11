import Sequelize, { Model } from 'sequelize'

class Maintence extends Model {
  static init(sequelize) {
    super.init(
      {
        desciption: Sequelize.TEXT,
        type: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        softwareChanges: Sequelize.BOOLEAN,
        hardwareChanges: Sequelize.BOOLEAN,
        sponsorAnalysis: Sequelize.BOOLEAN,
        eletricalScheme: Sequelize.BOOLEAN,
        affectSecurity: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.User) // 1 User (technican) / 1 Sponsor
    this.belongsToMany(models.User, {
      through: 'maintence_participants',
      as: 'participants',
      foreignKey: 'maintence_id',
    })
    this.belongsTo(models.Machine)
  }
}

export default Maintence
