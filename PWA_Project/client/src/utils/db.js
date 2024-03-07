import { openDB } from 'idb';
let db = null;
const openDatabase = async () => {
  db = await openDB('toursDB', 1, {
    upgrade(db) {
      db.createObjectStore('tours', { keyPath: 'tid' });
    },
  });
};

export { db, openDatabase };
