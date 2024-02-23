<script setup>
import { onMounted } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const route = useRoute();

const travelStore = useTravelStore();
const { tour } = storeToRefs(travelStore);
travelStore.getTour(route.params.id);
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
    <div class="row q-mb-md justify-center">
      <div class="column text-center justify-center bg-positive q-pt-md q-pb-md q-ma-md infoCard">
        <span>Availabe space: {{ tour.space }}</span>
        <span>{{ tour.type }} - ({{ tour.model }})</span>
      </div>
      <div class="column text-center bg-positive q-pt-md q-pb-md q-ma-md infoCard">
        <div class="row justify-center items-center">
          <q-icon class="fa-solid fa-building q-mr-md" size="sm"></q-icon>
          <span class="text-h6">{{ tour.name }}</span>
          <q-icon class="fa-solid fa-building q-ml-md" size="sm"></q-icon>
        </div>
        <span class="text-subtitle2">{{ tour.slogan }}</span>
      </div>
    </div>
    <div class="row q-mt-md justify-center">
      <div class="column text-center bg-positive q-pt-md q-pb-md q-ma-md infoCard">
        <div class="row justify-center items-center">
          <q-icon class="fa-solid fa-calendar-days q-mr-md" size="sm"></q-icon>
          <span>{{ tour.start_date }} - {{ tour.end_date }}</span>
          <q-icon class="fa-solid fa-calendar-days q-ml-md" size="sm"></q-icon>
        </div>

        <span>{{ tour.price }}€</span>
      </div>
      <div
        class="row items-center justify-center text-center bg-positive q-pt-md q-pb-md q-ma-md infoCard"
      >
        <q-icon
          color="warning"
          size="sm"
          class="fa-solid fa-star q-ml-sm"
          v-for="s in tour.rating"
        ></q-icon>
      </div>
    </div>
  </div>
  <div class="row justify-center q-mt-md q-mb-md">
    <q-btn class="bg-positive">Book Now</q-btn>
  </div>
</template>

<style lang="scss">
.infoCard {
  width: 20rem;
  border-radius: 10px;
}
</style>
