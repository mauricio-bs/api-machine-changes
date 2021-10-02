import Sequelize, { Model } from 'sequelize'

class Modification extends Model {
  static init(sequelize) {
    super.init(
      {
        desciption: Sequelize.TEXT,
        type: Sequelize.ENUM,
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
    this.belongsTo(models.User) // many users, 1 User (technican) / 1 Sponsor / many participants
    this.belongsTo(models.Machine)
  }
}

export default Modification
