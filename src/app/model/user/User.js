import Sequelize, { Model } from 'sequelize'
import { hash, compare } from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        id8: Sequelize.INTEGER,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        is_active: Sequelize.BOOLEAN,
        access: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await hash(user.password, 10)
      }
    })

    return this
  }

  checkPassword(password) {
    return compare(password, this.password_hash)
  }

  static associate(models) {
    // User infromations
    this.belongsTo(models.Role)
    this.belongsTo(models.Shift)
    this.hasOne(models.Shift, { foreignKey: 'sponsor_id', as: 'shift_manager' })
    // Maintence
    this.belongsToMany(models.Maintence, {
      through: 'maintence_participants',
      as: 'maintence',
      foreignKey: 'participant_id',
    })
    this.hasOne(models.Maintence, {
      foreignKey: 'technican_id',
      as: 'technican',
    })
    this.hasOne(models.Maintence, {
      foreignKey: 'sponsor_id',
      as: 'sponsor',
    })
  }
}

export default User
