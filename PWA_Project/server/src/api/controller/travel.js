import bcrypt from 'bcryptjs';

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
  dbUpdateUsername,
} from '../models/travel.js';

import { ValidateCustomer, ValidateChange } from '../validators/travel.js';

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
  const { cid } = req.params;
  const { rows } = await dbGetCustomerTours(cid);
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
    const params = req.body;
    const errors = ValidateCustomer(req.body);
    if (errors)
      return res.status(400).send(errors.details.map(({ message }) => message).join(', '));
    const { rows } = await dbCheckForUser(req.body);
    if (rows.length === 1) return res.status(401).send('Username already exists!');

    const salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt.value);
    await dbAddCustomer(params);
    return res.status(200).send('User was created!');
  } catch (err) {
    return res.status(505).send(err.message);
  }
};

const authenticateUser = async (username, pass) => {
  const { rows } = await dbGetPasswordByUsername(username);
  if (rows.length === 0) return false;
  const a = bcrypt.compareSync(pass, rows[0].password);
  if (!a) return false;
  if (a) return true;
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
    req.session.cid = rows[0].cid;
    return res.status(200).json({ login: true, user: req.session.user, cid: req.session.cid });
  }
  return true;
};

const updateUsername = async (req, res) => {
  try {
    const { newUser, oldUser } = req.body;

    const errors = ValidateChange(req.body);
    if (errors)
      return res.status(400).send(errors.details.map(({ message }) => message).join(', '));

    const { rows: exists } = await dbGetUserByUsername(newUser);
    if (exists.length !== 0) return res.status(404).send('Username already exists');

    const { rows } = await dbUpdateUsername(oldUser, newUser);
    if (rows.length === 0) return res.status(505).send('An error occured!');

    return res.status(200).send(`Your Username was changed to ${newUser}`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
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
  updateUsername,
};
