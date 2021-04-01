const OrderController = require('../Controllers/OrderController');
const express = require('express');
const router = express.Router();
const passport = require('../Controllers/jwtService');

router.get("/order", passport.authenticate("jwt", { session: false }), OrderController.getAll);
router.post("/order/create", passport.authenticate('jwt', { session: false }), OrderController.order);
router.post("/orderDetail/create", passport.authenticate('jwt', { session: false }), OrderController.orderDetail);
router.get(
  "/orderDetail/:id",
  passport.authenticate("jwt", { session: false }),
  OrderController.find
);


module.exports = router;