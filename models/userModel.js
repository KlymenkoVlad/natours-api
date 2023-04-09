const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//UserSchema with name, email, photo-string, password, passwordConfirm

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An user must have a name'],
    trim: true,
    maxlength: [30, 'An user name must have less or equal then 30 characters'],
    minlength: [1, 'An user name must have more or equal then 1 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'An user must have an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'An user must have an password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //only works on CREATE and SAVE!
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are different',
    },
  },
  passwordChangedAt: Date,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTImestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTImestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
