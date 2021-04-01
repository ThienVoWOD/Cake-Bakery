const User = require("../models/index").user;
const Role = require("../models/index").role;
const md5 = require("md5");

exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ include: [Role] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving User.",
      });
    });
};

exports.create = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.send("Email đã có người đăng kí!");
      }

      req.body.password = md5(req.body.password);

      User.create(req.body)
        .then(() => {
          res.send("Success");
        })
        .catch((err) => {
          res.send(500).send({
            message: err.message || "Fail",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Fail" });
    });
};
exports.edit = (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id },
  })
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(500).send({ message: err.message || "Fail" });
    });
};

exports.delete = (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(500).send({ message: err.message || "Fail" });
    });
};
