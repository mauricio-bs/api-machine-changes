'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'shift',
      [
        {
          name: 'administrativo',
          start_time: '',
          end_time: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'manha',
          start_time: '',
          end_time: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'tarde',
          start_time: '',
          end_time: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'noturno',
          start_time: '',
          end_time: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shift', [
      {
        name: 'administrativo',
      },
      {
        name: 'manha',
      },
      {
        name: 'tarde',
      },
      {
        name: 'noturno',
      },
    ])
  },
}
