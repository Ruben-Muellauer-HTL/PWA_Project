import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getTours,
  getTourDetail,
  bookTour,
  getCustomerInfo,
  getCustomerTours,
  deleteTour,
} from '../controller/travel.js';

const router = express.Router();

router.get('/tours', asyncHandler(getTours));

router.get('/tours/:id', asyncHandler(getTourDetail));

router.post('/tour', asyncHandler(bookTour));

router.get('/customer/:cid', asyncHandler(getCustomerInfo));

router.get('/customer/tours/:id', asyncHandler(getCustomerTours));

router.delete('/tour', asyncHandler(deleteTour));

export default router;
