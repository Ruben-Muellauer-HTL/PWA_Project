import { defineStore } from 'pinia';
import axios from 'axios';

import { ref } from 'vue';

export const useTravelStore = defineStore('travelStore', () => {
  const tours = ref(null);

  const fetchTours = async () => {
    const { data } = await axios.get('http://localhost:3000/tours');
    tours.value = data;
  };

  return { tours, fetchTours };
});
