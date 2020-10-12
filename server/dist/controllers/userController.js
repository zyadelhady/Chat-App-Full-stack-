"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.createUser = exports.getMe = void 0;
const userModel_1 = require("../models/userModel");
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
exports.getMe = (req, res, next) => {
    req.params.id = req.session.user._id;
    console.log(req.session.user._id);
    next();
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defiend! Please use /singup instead',
    });
};
exports.getUser = catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await userModel_1.User.findById(req.params.id);
    if (!doc) {
        return next(new appError_1.AppError(`No document found with that ID`, 404));
    }
    res.status(200).json({ status: 'success', data: doc });
});
exports.getUsers = catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await userModel_1.User.find();
    res.status(200).json({ status: 'success', data: doc });
});
