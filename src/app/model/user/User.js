import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        id8: Sequelize.INTEGER,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        access: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 5)
      }
    })
    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }

  static associate(models) {
    // User infromations
    this.belongsTo(models.Shift)
    this.belongsTo(models.Role)
    this.hasOne(models.Shift, { foreignKey: 'sponsor_id', as: 'sponsor' })
    // Modification
    this.hasMany(models.Modification, {
      foreignKey: 'participant_id',
      as: 'participant',
    })
    this.hasOne(models.Modification, {
      foreignKey: 'user_id',
      as: 'technican',
    })
    this.hasOne(models.Modification, {
      foreignKey: 'sponsor_id',
      as: 'sponsor',
    })
  }
}

export default User
