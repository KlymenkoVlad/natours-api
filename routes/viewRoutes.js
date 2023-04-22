const express = require('express');
const {
  getOverview,
  getTour,
  getLogin,
  getAccount,
} = require('../controllers/viewsController');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, getOverview);
router.get('/tour/:name', authController.isLoggedIn, getTour);
router.get('/login', authController.isLoggedIn, getLogin);
router.get('/me', authController.protect, getAccount);

module.exports = router;
