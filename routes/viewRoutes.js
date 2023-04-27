const express = require('express');
const {
  getOverview,
  getTour,
  getLogin,
  getAccount,
  updateUserData,
  getMyTours,
  alerts,
} = require('../controllers/viewsController');

const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(alerts);

router.get('/', authController.isLoggedIn, getOverview);

router.get('/tour/:name', authController.isLoggedIn, getTour);
router.get('/login', authController.isLoggedIn, getLogin);
router.get('/me', authController.protect, getAccount);

router.get(
  '/my-tours',
  authController.protect,
  // bookingController.createBookingCheckout,
  getMyTours
);

router.post('/submit-user-data', authController.protect, updateUserData);

module.exports = router;
