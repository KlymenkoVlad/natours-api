const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) get the data, for the requested tour (inculding reviews and guides) DON`t forget for reviews!
  const tour = await Tour.findOne({ slug: req.params.name }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  console.log(tour);
  // 2) Build template

  // 3) Create template using data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLogin = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log in',
  });
});
