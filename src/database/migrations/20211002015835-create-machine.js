// 'use strict'

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('machine', {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//         unique: true,
//       },
//       number: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       model: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       machine_function: {
//         type: Sequelize.INTEGER,
//       },
//       cnc: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'cnc',
//           key: 'id',
//         },
//       },
//       plc: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'plc',
//           key: 'id',
//         },
//       },
//       driver: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'driver',
//           key: 'id',
//         },
//       },
//       ihm: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'ihm',
//           key: 'id',
//         },
//       },
//       software: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         references: {
//           model: 'software',
//           key: 'id',
//         },
//       },
//       line: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'line',
//           key: 'id',
//         },
//       },
//       building: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'building',
//           key: 'id',
//         },
//       },
//       active: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//       updated_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//     })
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('machine')
//   },
// }
