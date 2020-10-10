"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isEmail_1 = require("../utils/isEmail");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'A user must have a username'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an e-mail'],
        unique: true,
        lowercase: true,
        validate: [isEmail_1.isEmail, 'Please provide a valid email'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
    online: {
        type: Boolean,
        default: true,
    },
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs_1.default.hash(this.password, 12);
        this.passwordConfirm = undefined;
    }
    if (this.isModified('username')) {
        this.username = this.username.replace(/\s+/g, '');
    }
    next();
});
userSchema.pre(/^find/, function (next) {
    // this.find({ active: { $ne: false } });
    next();
});
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
};
exports.User = mongoose_1.model('User', userSchema);
