'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order_detals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_order: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
      },
      price: {
        type: Sequelize.DOUBLE
      },
      amount: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Order_detals');
  }
};