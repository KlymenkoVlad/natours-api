const express = require('express');
const {
  getOverview,
  getTour,
  getLogin,
} = require('../controllers/viewsController');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', getOverview);
router.get('/tour/:name', getTour);
router.get('/login', getLogin);

module.exports = router;
