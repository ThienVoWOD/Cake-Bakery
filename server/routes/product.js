const ProductController = require('../Controllers/ProductController');
const express = require('express');
const router = express.Router();
const passport = require('../Controllers/jwtService');

router.get('/products',ProductController.findAll);
router.get('/product/:id',ProductController.findOne);
router.get('/product/category/:id',ProductController.findByCat);

router.use('/images', express.static('upload/images'));
router.post('/product/create', passport.authenticate('jwt', { session: false }), ProductController.create);
router.delete('/product/delete/:id', passport.authenticate('jwt', { session: false }), ProductController.delete);
router.put('/product/edit/:id', passport.authenticate('jwt', { session: false }), ProductController.edit);
router.post('/product/update/:id', passport.authenticate('jwt', { session: false }), ProductController.update);

module.exports = router;

