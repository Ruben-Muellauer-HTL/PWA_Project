import {
  dbGetTours,
  dbGetTourDetail,
  dbBookTour,
  dbGetCustomerInfo,
  dbGetCustomerTours,
  dbDeleteTour,
} from '../models/travel.js';

const getTours = async (req, res) => {
  const { rows } = await dbGetTours();
  res.status(200).json(rows);
};

const getTourDetail = async (req, res) => {
  const { id } = req.params;
  const { rows } = await dbGetTourDetail(id);
  res.status(200).json(rows);
};

const bookTour = async (req, res) => {
  const { cid, tid } = req.body;
  try {
    const { rows } = await dbBookTour(cid, tid);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getCustomerInfo = async (req, res) => {
  const { cid } = req.params;
  try {
    const { rows } = await dbGetCustomerInfo(cid);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getCustomerTours = async (req, res) => {
  const { id } = req.params;
  const { rows } = await dbGetCustomerTours(id);
  res.status(200).json(rows);
};

const deleteTour = async (req, res) => {
  const { customer, tour } = req.query;
  const { rows } = await dbDeleteTour(customer, tour);
  if (rows.length !== 0) res.status(200).json(rows);
  else res.status(404).send('No Tour found!');
};

export { getTours, getTourDetail, bookTour, getCustomerInfo, getCustomerTours, deleteTour };
