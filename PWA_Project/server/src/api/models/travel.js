import { query } from '../../db/index.js';

const dbGetTours = () =>
  query(`select * from tour
join location l on l.lid = tour.lid
join company c on c.co_id = tour.co_id;`);

const dbGetTourDetail = (id) =>
  query(
    `select * from tour
join location l on l.lid = tour.lid
         join location_images li on l.lid = li.lid
         join company c on c.co_id = tour.co_id
         join vehicle v on c.co_id = v.co_id
where tid = $1;`,
    [id],
  );

const dbBookTour = (customer, tour) =>
  query('insert into book (book_date, cancel, cid, tid) VALUES ($1, false, $2,$3) returning *', [
    new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
    customer,
    tour,
  ]);

const dbGetCustomerInfo = (customer) =>
  query(
    `select *
from customer
where username = $1`,
    [customer],
  );

const dbGetCustomerTours = (customer) =>
  query(
    `select tget.*, l.*, c2.*, v.*
from tour as tget
         join location l on l.lid = tget.lid
         join book b on tget.tid = b.tid
         join customer c on c.cid = b.cid
         join company c2 on tget.co_id = c2.co_id
         join vehicle v on c2.co_id = v.co_id
where c.cid = $1;`,
    [customer],
  );

const dbDeleteTour = (customer, tour) =>
  query(
    `delete
from book
where cid = $1
  and tid = $2
  and bid = (select min(bid) from book where cid = $1 and tid = $2) returning *`,
    [customer, tour],
  );

const dbCheckForUser = ({ username }) =>
  query('select username from customer where username = $1', [username]);
const dbAddCustomer = (customerInfo) =>
  query(
    `insert into customer VALUES
     ((select(max(cid)) from customer)+1,$1, $2, $3, $4, false, $5, $6, $7, $8);`,
    [
      customerInfo.firstname,
      customerInfo.lastname,
      customerInfo.username,
      customerInfo.password,
      customerInfo.email,
      customerInfo.plz,
      customerInfo.street,
      customerInfo.city,
    ],
  );

const dbGetPasswordByUsername = (username) =>
  query('select password from customer where username = $1', [username]);

const dbGetUserByUsername = (username) =>
  query('select * from customer where username = $1', [username]);

export {
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
};
