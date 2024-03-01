import express from 'express';
import asyncHandler from 'express-async-handler';
import { getTours, getTourDetail, bookTour, getCustomerInfo } from '../controller/travel.js';

const router = express.Router();

router.get('/tours', asyncHandler(getTours));

router.get('/tours/:id', asyncHandler(getTourDetail));

router.post('/tour', asyncHandler(bookTour));

router.get('/customer/:cid', asyncHandler(getCustomerInfo));

export default router;
