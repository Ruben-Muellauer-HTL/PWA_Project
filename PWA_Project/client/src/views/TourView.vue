<script setup>
import { useTravelStore } from '../stores/travelStore.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore.js';
import { notifySuccess, notifyWarning } from '../composable/notify.js';
import { isOnline } from '../utils/onlineTest.js';

const route = useRoute();

const travelStore = useTravelStore();
const { tour } = storeToRefs(travelStore);

const userStore = useUserStore();
const { username, cid } = storeToRefs(userStore);

travelStore.getTour(route.params.id);

const bookTour = (id) => {
  try {
    travelStore.bookTour(cid.value, id);
    travelStore.getCustomerTours(cid.value);
    notifySuccess('Tour was successfully booked!');
  } catch (err) {
    notifyWarning('Tour could not be booked! Try again later!');
  }
};
</script>

<template>
  <div class="text-h3 text-secondary text-center q-mt-lg q-mb-md column">
    <span>Explore the beautiful sight of {{ tour.city }}</span>
    <span class="text-subtitle1">With {{ tour.name }}</span>
  </div>
  <div class="row justify-center">
    <q-img :src="`http://localhost:3000${tour.image}`" class="q-ma-lg" style="width: 40rem"></q-img>
    <q-img :src="`http://localhost:3000${tour.image}`" class="q-ma-lg" style="width: 40rem"></q-img>
  </div>
  <div class="column items-center">
    <div class="column text-center items-center bg-positive q-pt-md q-pb-md q-ma-sm infoCard">
      <q-icon class="fa-solid fa-globe" size="xl" color="primary"></q-icon>
      <span class="q-mt-md">Availabe Space: {{ tour.space }}</span>
      <span>{{ tour.type }} - ({{ tour.model }})</span>
    </div>
    <div class="row justify-center">
      <div class="column items-center bg-positive q-pt-md q-pb-md q-ma-sm infoCard">
        <q-icon class="fa-solid fa-building" size="xl" color="primary"></q-icon>
        <span class="q-mt-md">{{ tour.name }}</span>
      </div>
      <div class="column items-center bg-positive q-pt-md q-pb-md q-ma-sm infoCard">
        <q-icon class="fa-solid fa-calendar-days" size="xl" color="primary"></q-icon>
        <span class="q-mt-md">{{ tour.start_date }} - {{ tour.end_date }}</span>
      </div>
      <div class="row justify-center items-center bg-positive q-pt-md q-pb-md q-ma-sm infoCard">
        <q-icon
          color="warning"
          size="sm"
          class="fa-solid fa-star q-ml-sm"
          v-for="s in tour.rating"
          :key="s"
        ></q-icon>
      </div>
    </div>
  </div>
  <div class="row justify-center q-mt-lg q-mb-md" v-if="username || isOnline">
    <q-btn class="bg-positive" @click="bookTour(tour.tid)">Book Now</q-btn>
  </div>
</template>

<style lang="scss">
.infoCard {
  width: 20rem;
  border-radius: 10px;
}
</style>
