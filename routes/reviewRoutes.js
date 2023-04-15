const express = require('express');
const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewContoller');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//protect functionality
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user', 'admin'), setTourUserIds, createReview);

router.route('/:id').patch(updateReview).delete(deleteReview).get(getReview);

module.exports = router;
