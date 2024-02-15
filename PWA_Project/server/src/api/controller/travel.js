import { dbGetCustomers } from '../models/travel.js';

const getCustomers = async (req, res) => {
  const { rows } = await dbGetCustomers();
  res.status(200).json(rows);
};

export { getCustomers };
