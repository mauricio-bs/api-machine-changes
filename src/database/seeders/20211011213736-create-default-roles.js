'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'role',
      [
        {
          name: 'supervisor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'encarregado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'tecnico',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'estagiario',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', [
      {
        name: 'supervisor',
      },
      {
        name: 'encarregado',
      },
      {
        name: 'tecnico',
      },
      {
        name: 'estagiario',
      },
    ])
  },
}
