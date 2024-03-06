import {
  dbGetTours,
  dbGetTourDetail,
  dbBookTour,
  dbGetCustomerInfo,
  dbGetCustomerTours,
  dbDeleteTour,
  dbAddCustomer,
  dbCheckForUser,
  dbGetPasswordByUsername,
  dbGetUserByUsername,
} from '../models/travel.js';

import { ValidateCustomer } from '../validators/travel.js';

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
  const { username } = req.params;
  try {
    const { rows } = await dbGetCustomerInfo(username);
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

const addCustomer = async (req, res) => {
  try {
    const errors = ValidateCustomer(req.body);
    if (errors)
      return res.status(400).send(errors.details.map(({ message }) => message).join(', '));
    const { rows } = await dbCheckForUser(req.body);
    if (rows.length === 1) return res.status(401).send('Username already exists!');
    await dbAddCustomer(req.body);
    return res.status(200).send('User was created!');
  } catch (err) {
    return res.status(505).send(err.message);
  }
};

const authenticateUser = async (username, pass) => {
  const { rows } = await dbGetPasswordByUsername(username);
  if (pass === rows[0].password) return true;
  return false;
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const login = await authenticateUser(username, password);
  if (!login) {
    return res.status(200).json({
      login: false,
      message: 'Incorrect username or password!',
      error: 'pass',
    });
  }
  if (login === true) {
    req.session.user = username;
    const { rows } = await dbGetUserByUsername(username);
    req.session.uid = rows[0].cid;
    return res.status(200).json({ login: true, user: req.session.user });
  }
  return true;
};

export {
  getTours,
  getTourDetail,
  bookTour,
  getCustomerInfo,
  getCustomerTours,
  deleteTour,
  addCustomer,
  loginUser,
};
