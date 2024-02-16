import { query } from '../../db/index.js';

const dbGetCustomers = () => query('select * from customer');

const dbGetTours = () => query(`select * from tour
join location l on l.lid = tour.lid
join company c on c.co_id = tour.co_id;`);

export { dbGetCustomers, dbGetTours };
