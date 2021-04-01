"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "Bánh mì"
        },
        {
          id: 2,
          name: "Bánh gato",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          name: "Bánh mì thịt",
          price: 20000,
          image_url: "images/cake_1610445210160.jpg",
          describe: "Bánh mì thịt",
          category_id: 1,
        },
        {
          id: 2,
          name: "Bánh bông lan",
          price: 20000,
          image_url: "images/cake_1610445357574.jpg",
          describe: "Bánh bông lan",
          category_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  },
};
