import { defineStore } from 'pinia';
import axios from 'axios';

import { ref } from 'vue';

export const useTravelStore = defineStore('travelStore', () => {
  const tours = ref(null);
  const tour = ref(null);
  const customerInfo = ref(null);

  const fetchTours = async () => {
    const { data } = await axios.get('http://localhost:3000/tours');
    tours.value = data;
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

  return { tours, tour, customerInfo, fetchTours, getTour, bookTour, getCustomerInfo };
});
