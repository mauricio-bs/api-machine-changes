'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shift: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shift',
          key: 'id',
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      access: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  },
}
