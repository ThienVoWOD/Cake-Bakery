const CategoryController = require('../Controllers/CategoryController');
const express = require('express');
const router = express.Router();
const passport = require('../Controllers/jwtService');

router.get('/categories',CategoryController.findAll);
router.post('/category/create', passport.authenticate('jwt', { session: false }),CategoryController.create);
router.put('/category/edit/:id', passport.authenticate('jwt', { session: false }),CategoryController.edit)
router.delete('/category/delete/:id', passport.authenticate('jwt', { session: false }),CategoryController.delete);

module.exports = router;

