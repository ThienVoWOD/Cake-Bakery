'use strict';
const md5 = require('md5');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'user',
      }
    ], {});

    await queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'admin@gmail.com',
      name: 'admin',
      password: md5('admin'),
      role_id: 1,
    }, {
      id: 2,
      email: 'thien@gmail.com',
      name: 'Võ Tá Thiện',
      password: md5('thien'),
      role_id: 1,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};