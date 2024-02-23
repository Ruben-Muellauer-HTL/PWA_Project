import { dbGetCustomers, dbGetTours, dbGetTourDetail } from '../models/travel.js';

const getCustomers = async (req, res) => {
  const { rows } = await dbGetCustomers();
  res.status(200).json(rows);
};

const getTours = async (req, res) => {
  const { rows } = await dbGetTours();
  res.status(200).json(rows);
};

const getTourDetail = async (req, res) => {
  const { id } = req.params;
  const { rows } = await dbGetTourDetail(id);
  res.status(200).json(rows);
};

export { getCustomers, getTours, getTourDetail };
