const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');
const passport = require('../Controllers/jwtService');
const express = require('express');
const router = express.Router();

router.get('/users',passport.authenticate('jwt', { session: false }), UserController.findAll);
router.post('/login', AuthController.Login);
router.post('/register', UserController.create);
router.post('/user/create', passport.authenticate('jwt', { session: false }), UserController.create);
router.put('/user/edit/:id', passport.authenticate('jwt', { session: false }), UserController.edit);
router.delete('/user/delete/:id', passport.authenticate('jwt', { session: false }), UserController.delete)

module.exports = router;

