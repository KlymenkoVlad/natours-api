const express = require('express');
const {
  createReview,
  getAllReviews,
} = require('../controllers/reviewContoller');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

//protect functionality
router
  .route('/')
  .get(protect, restrictTo('user', 'admin'), getAllReviews)
  .post(createReview);

module.exports = router;
