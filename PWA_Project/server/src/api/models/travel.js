import { query } from '../../db/index.js';

const dbGetCustomers = () => query('select * from customer');

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

export { dbGetCustomers, dbGetTours, dbGetTourDetail };
