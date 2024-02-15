import { query } from '../../db/index.js';

const dbGetCustomers = () => query('select * from customer');

export { dbGetCustomers };
