const Product = require("../models/index").product;
const Category = require("../models/index").category;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../models");
const Op = db.Op;

exports.findAll = (req, res) => {
  Product.findAll({ include: [Category] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving Product.",
      });
    });
};
exports.findOne = (req, res) => {
  Product.findOne({ where:{ id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving Product.",
      });
    });
};

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `cake_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
}).single("image_url");

exports.create = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.send("Lỗi đăng ảnh");
    } else {
      req.body.image_url = "images/" + req.file.filename;
      Product.create(req.body)
        .then(() => {
          res.send("Success");
        })
        .catch((err) => {
          res.send(500).send({
            message: err.message || "Fail",
          });
        });
    }
  });
};

exports.delete = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  }).then((product) => {
    const path = "./upload/" + product.image_url;
    fs.unlinkSync(path, (err) => {
      if (err) {
        console.error(err);
      }
    });

    Product.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.send("Success");
      })
      .catch((err) => {
        res.send(500).send({ message: err.message || "Fail" });
      });
  });
};

exports.edit = (req, res) => {
  Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Fail",
      });
    });
};
exports.update = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send("Lỗi đăng ảnh");
    } else {
      req.body.image_url = "images/" + req.file.filename;
      Product.update(req.body, {
        where: { id: req.params.id },
      })
        .then(() => {
          res.send("Success");
        })
        .catch((err) => {
          res.send(500).send({
            message: err.message || "Fail",
          });
        });
    }
  });

  Product.findOne({
    where: {
      id: req.params.id,
    },
  }).then((product) => {
    const path = "./upload/" + product.image_url;
    fs.unlinkSync(path, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, products };
};

exports.findByCat = (req, res) => {
  const {page , keyword, begin, end, sort, name} = req.query;
  const limit = 3;
  const offset = page ? (page - 1) * limit : 0;
  const keywords = keyword ? keyword : "";
  const price1 = begin ? begin : "0";
  const price2 = end ? end : "1500000";
  const name2 = name ? name : "id"
  const sort2 = sort ? sort : "ASC"
  Product.findAndCountAll({ 
    where: {
      category_id: req.params.id,
      name: { [Op.like]: `%${keywords}%` },
      price: { [Op.between]: [price1, price2] },
    },
    limit,
    offset,
    order: [
      [name2, sort2],
  ],
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    });
};