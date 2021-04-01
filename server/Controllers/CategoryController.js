const Category = require("../models/index").category;
const Product = require("../models/index").product;
exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message:
          err.message || "Some error accurred while retrieving Category.",
      });
    });
};

exports.create = (req, res) => {
  Category.create(req.body)
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(500).send({ message: err.message || "Fail" });
    });
};

exports.edit = (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(500).send({ message: err.message || "Fail" });
    });
};

exports.delete = (req, res) => {
  Product.findOne({ where: { id: req.params.id } }).then((product) => {
    if (!product) {
      Category.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.send("Success");
        })
        .catch((err) => {
          res.send(500).send({ message: err.message || "Fail" });
        });
    } else {
      res.send("Loại bánh này đang được dùng");
    }
  });
};
