import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getTours,
  getTourDetail,
  bookTour,
  getCustomerInfo,
  getCustomerTours,
  deleteTour,
  addCustomer,
  loginUser,
  updateUsername,
} from '../controller/travel.js';

const router = express.Router();

router.get('/tours', asyncHandler(getTours));

router.get('/tours/:id', asyncHandler(getTourDetail));

router.post('/tour', asyncHandler(bookTour));

router.get('/customer/:cid', asyncHandler(getCustomerInfo));

router.get('/customer/tours/:cid', asyncHandler(getCustomerTours));

router.delete('/tour', asyncHandler(deleteTour));

router.post('/customer', asyncHandler(addCustomer));

router.post('/customer/login', asyncHandler(loginUser));

router.patch('/customer', asyncHandler(updateUsername));

router.get(
  '/customer/login/checklogin',
  asyncHandler((req, res) => {
    return res.status(200).json({
      login: req.session.user ? true : false,
      user: req.session.user,
      cid: req.session.cid,
    });
  }),
);

export default router;
