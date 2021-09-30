'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shift', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      sponsor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'user',
          key: 'id',
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shift')
  },
}
