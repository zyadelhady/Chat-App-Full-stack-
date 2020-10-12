import path from 'path';
import express from 'express';
import morgan from 'morgan';
// const rateLimit = require('express-rate-limit');
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
const xss = require('xss-clean');
import compression from 'compression';
import cors from 'cors';
import { globalErrorHandler } from './controllers/errorController';
import userRouter from './routes/userRoutes';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const app = express();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

app.enable('trust proxy');

// 1) Global Middlewares

// Implement CORS
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
} else {
  app.use(cors({ credentials: true }));
}

app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

app.use(
  session({
    name: 'session',
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: +process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    secret: process.env.SECRET,
    resave: false,
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'build')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, [req.body]
app.use(express.json({ limit: '10kb' }));

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent paramter pollution
app.use(compression());

// Test middleware
// app.use((req, res, next) => {
//   next();
// });

// Routes
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.use(globalErrorHandler);

export default app;
