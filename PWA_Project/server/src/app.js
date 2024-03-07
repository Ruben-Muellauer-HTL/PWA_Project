import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import travelRoute from './api/routes/travel.js';
import { errorHandler, notFoundHandler } from './error/errorHandler.js';

dotenv.config();

const { NODE_ENV, SESSION_LIFETIME, SESSION_SECRET } = process.env;

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * SESSION_LIFETIME,
      sameSite: 'lax',
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(process.cwd(), '/public')));
app.use(express.static(path.join(process.cwd(), '/client')));

app.use(express.json());

app.use('/', travelRoute);
// app.use(notFoundHandler);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
