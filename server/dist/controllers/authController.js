"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = exports.protect = void 0;
const userModel_1 = require("../models/userModel");
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
exports.protect = (req, res, next) => {
    console.log(req.session);
    if (!req.session.user) {
        return next(new appError_1.AppError('You are not logged int! Please log in to get access.', 401));
    }
    next();
};
exports.signup = catchAsync_1.catchAsync(async (req, res, next) => {
    const newUser = await userModel_1.User.create({
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
exports.login = catchAsync_1.catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.AppError(`Please provide email and password!`, 400));
    }
    const user = await userModel_1.User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError_1.AppError('Incorrect email or password', 401));
    }
    user.password = undefined;
    req.session.user = user;
    res.status(200).json({
        status: 'success',
        data: user,
    });
});
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('session');
        if (err) {
            return res.json({ status: 'faild' });
        }
        res.json({ status: 'success' });
    });
};
