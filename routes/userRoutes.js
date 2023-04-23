const express = require('express');

const {
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
  deleteMe,
  createUser,
  deleteUser,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController');

const {
  protect,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
