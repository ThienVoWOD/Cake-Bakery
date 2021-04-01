const User = require('../models/index').user;
const Role = require('../models/index').role;

const md5 = require("md5");

const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'VoTaThien';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    next(null, jwt_payload)
});
passport.use(strategy);

  exports.Login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
      where: {
        email: email
      },
      include: [Role]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Tài khoản không tồn tại" });
        }
        if(md5(password) !== user.password){      
          return res.send({ message: "Mật khẩu không đúng" });
        }
        
        const payload = {
            id: user.id,
            email: user.email,
            role: user.Role.name,
        };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        console.log("token: " + token);
        res.json({
            token: token,
            email: user.email,
            name: user.name,
            id: user.id,
            role: user.Role.name
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.register = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (user) {
          return res.send("Email đã có người đăng kí!");
        }
        req.body.role_id = 2;
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