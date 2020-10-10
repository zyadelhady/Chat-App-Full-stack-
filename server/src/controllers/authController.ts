import { RequestHandler } from 'express';
import { User } from '../models/userModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const protect: RequestHandler = (req, res, next) => {
  if (!req.session.user) {
    return next(
      new AppError('You are not logged int! Please log in to get access.', 401)
    );
  }
  next();
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username.toLowerCase().replace(/\s/g, ''),
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  newUser.password = undefined;

  req.session.user = newUser;

  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide email and password!`, 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password!))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  user.password = undefined;

  req.session.user = user;

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const logout: RequestHandler = (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('session');
    if (err) {
      return res.json({ status: 'faild' });
    }
    res.json({ status: 'success' });
  });
};
