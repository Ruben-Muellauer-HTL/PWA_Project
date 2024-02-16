import express from 'express';
import asyncHandler from 'express-async-handler';
import { getCustomers, getTours } from '../controller/travel.js';

const router = express.Router();

router.get('/customers', asyncHandler(getCustomers));

router.get('/tours', asyncHandler(getTours));

export default router;
