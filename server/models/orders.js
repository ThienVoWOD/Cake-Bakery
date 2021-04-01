'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Orders.init({
    id_user: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};