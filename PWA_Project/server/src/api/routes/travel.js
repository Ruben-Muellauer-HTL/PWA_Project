import express from 'express';
import asyncHandler from 'express-async-handler';
import { getCustomers, getTours, getTourDetail } from '../controller/travel.js';

const router = express.Router();

router.get('/customers', asyncHandler(getCustomers));

router.get('/tours', asyncHandler(getTours));

router.get('/tours/:id', asyncHandler(getTourDetail));

export default router;
