import { query } from '../../db/index.js';

const dbGetTours = () => query(`select * from tour
join location l on l.lid = tour.lid
join company c on c.co_id = tour.co_id;`);

const dbGetTourDetail = (id) => query(
  `select * from tour
join location l on l.lid = tour.lid
         join location_images li on l.lid = li.lid
         join company c on c.co_id = tour.co_id
         join vehicle v on c.co_id = v.co_id
where tid = $1;`,
  [id],
);

const dbBookTour = (customer, tour) => query('insert into book (book_date, cancel, cid, tid) VALUES ($1, false, $2,$3) returning *', [
  new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
  customer,
  tour,
]);

const dbGetCustomerInfo = (customer) => query(
  `select *
from customer
join address a on customer.plz = a.plz
where cid = $1`,
  [customer],
);

export { dbGetTours, dbGetTourDetail, dbBookTour, dbGetCustomerInfo };
