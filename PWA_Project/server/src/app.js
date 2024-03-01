import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import travelRoute from './api/routes/travel.js';
import { errorHandler, notFoundHandler } from './error/errorHandler.js';

dotenv.config();

const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(dirname, '/public')));

app.use(express.json());

app.use('/', travelRoute);
// app.use(notFoundHandler);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
