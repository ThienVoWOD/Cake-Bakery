'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};