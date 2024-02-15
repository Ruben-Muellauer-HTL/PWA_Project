import express from 'express';
import asyncHandler from 'express-async-handler';
import { getCustomers } from '../controller/travel.js';

const router = express.Router();

router.get('/customers', asyncHandler(getCustomers));

export default router;
