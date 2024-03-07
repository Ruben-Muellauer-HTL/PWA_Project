import { defineStore } from 'pinia';
import axios from 'axios';

import { ref } from 'vue';

export const useTravelStore = defineStore('travelStore', () => {
  const tours = ref(null);
  const allTours = ref(null);
  const tour = ref(null);
  const customerInfo = ref(null);

  const fetchTours = async () => {
    const { data } = await axios.get('http://localhost:3000/tours');
    allTours.value = data;
  };

  const getTour = async (id) => {
    const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
    tour.value = data[0];
  };

  const bookTour = async (customer, tour) => {
    await axios.post('http://localhost:3000/tour', {
      cid: customer,
      tid: tour,
    });
  };

  const getCustomerInfo = async (customer) => {
    const { data } = await axios.get(`http://localhost:3000/customer/${customer}`);
    customerInfo.value = data[0];
  };

  const getCustomerTours = async (customer) => {
    const { data } = await axios.get(`http://localhost:3000/customer/tours/${customer}`);
    tours.value = data;
  };

  const deleteTour = async (cid, tid) => {
    await axios.delete(`http://localhost:3000/tour?customer=${cid}&tour=${tid}`);
    getCustomerTours(cid);
  };

  const addCustomer = async (firstname, lastname, username, password, email, plz, street, city) => {
    try {
      await axios.post('http://localhost:3000/customer', {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        plz: plz,
        street: street,
        city: city,
      });
    } catch (err) {
      return err.response.data;
    }
  };

  return {
    tours,
    tour,
    customerInfo,
    fetchTours,
    getTour,
    bookTour,
    getCustomerInfo,
    getCustomerTours,
    deleteTour,
    addCustomer,
    allTours,
  };
});
