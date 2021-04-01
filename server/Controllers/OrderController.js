const Order = require("../models/index").order;
const orderDetail = require("../models/index").orderDetail;
const Product = require("../models/index").product;
const User = require("../models/index").user;

exports.getAll = (req, res) => {
  Order.findAll({ include: [User] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "error",
      });
    });
}

exports.order = (req, res) => {

  Order.create(req.body)
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving order.",
      });
    });
};

exports.orderDetail = (req, res) => {
    console.log(req.body);
  orderDetail
    .create(req.body)
    .then((orderDetail) => {
      res.send(orderDetail);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving order.",
      });
    });
};

exports.find = (req, res) => {
  orderDetail.findAll({
      where: {
        id_order: req.params.id,
      },
      include: [Product],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "error",
      });
    });
};