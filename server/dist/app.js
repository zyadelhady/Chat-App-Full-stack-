"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// const rateLimit = require('express-rate-limit');
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss = require('xss-clean');
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const errorController_1 = require("./controllers/errorController");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const app = express_1.default();
const RedisStore = connect_redis_1.default(express_session_1.default);
const redisClient = redis_1.default.createClient({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
app.enable('trust proxy');
// 1) Global Middlewares
// Implement CORS
if (process.env.NODE_ENV === 'development') {
    app.use(cors_1.default({ origin: 'http://localhost:3000', credentials: true }));
}
else {
    app.use(cors_1.default({ credentials: true }));
}
app.options('*', cors_1.default());
// Set security HTTP headers
app.use(helmet_1.default());
// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);
app.use(express_session_1.default({
    name: 'session',
    store: new RedisStore({
        client: redisClient,
        disableTouch: true,
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: +process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    secret: process.env.SECRET,
    resave: false,
}));
// Serving static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
// Body parser, [req.body]
app.use(express_1.default.json({ limit: '10kb' }));
// Data sanitization against noSQL query injection
app.use(express_mongo_sanitize_1.default());
// Data sanitization against XSS
app.use(xss());
// Prevent paramter pollution
app.use(compression_1.default());
// Test middleware
// app.use((req, res, next) => {
//   next();
// });
// Routes
app.use('/api/v1/users', userRoutes_1.default);
app.all('*', (req, res, next) => {
    res.sendFile(`${__dirname}/build/index.html`);
});
app.use(errorController_1.globalErrorHandler);
exports.default = app;
