import { RequestHandler } from 'express';
import { User } from '../models/userModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const getMe: RequestHandler = (req, res, next) => {
  req.params.id = req.session.user._id;
  console.log(req.session.user._id);
  next();
};

export const createUser: RequestHandler = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defiend! Please use /singup instead',
  });
};

export const getUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);

  if (!doc) {
    return next(new AppError(`No document found with that ID`, 404));
  }

  res.status(200).json({ status: 'success', data: doc });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const doc = await User.find();
  res.status(200).json({ status: 'success', data: doc });
});
