'use strict';

const fs = require('fs');
const path = require('path');
const {Op, Sequelize} = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/config').development;
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
 const sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Op = Op;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.order = require("./orders")(sequelize, Sequelize);
db.orderDetail = require("./order_detals")(sequelize, Sequelize);

db.role.hasMany(db.user, {foreignKey: 'role_id'});
db.user.belongsTo(db.role, {foreignKey: 'role_id'});

db.category.hasMany(db.product, {foreignKey: 'category_id'});
db.product.belongsTo(db.category, {foreignKey: 'category_id'});

db.user.hasMany(db.order, {foreignKey: 'id_user'});
db.order.belongsTo(db.user, {foreignKey: 'id_user'});

db.order.hasMany(db.orderDetail, {foreignKey: 'id_order'});
db.orderDetail.belongsTo(db.order, { foreignKey: "id_order" });

db.product.hasMany(db.orderDetail, {foreignKey: 'id_product'});
db.orderDetail.belongsTo(db.product, { foreignKey: "id_product" });

module.exports = db;
