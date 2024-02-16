<script setup>
import { ref, onMounted } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { storeToRefs } from 'pinia';
import TourCard from '../components/TourCard.vue';

const travelStore = useTravelStore();

const { tours } = storeToRefs(travelStore);

onMounted(() => travelStore.fetchTours());

let fromFilter = ref(null);
let toFilter = ref(null);
let cityFilter = ref(null);

let slide = ref(null);
let filteredTours = ref(null);

const filterValues = () => {
  tours.value = tours.value.filter(({ city, start_date, end_date }) =>
    city.includes(cityFilter.value),
  );
};

const resetValues = () => {
  toFilter.value = null;
  fromFilter.value = null;
  cityFilter.value = null;
  travelStore.fetchTours();
};
</script>

<template>
  <div class="bg-positive column justify-center">
    <q-form class="q-gutter-md q-pa-md row justify-center">
      <q-input rounded standout label="City" v-model="cityFilter" />
      <q-input rounded standout v-model="fromFilter" mask="date" label="From" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="fromFilter">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input rounded standout v-model="toFilter" label="To" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="toFilter">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-form>
    <div class="row justify-center q-mb-md">
      <q-btn rounded class="bg-secondary text-white" style="height: 1rem" @click="filterValues()"
        >Search</q-btn
      >
      <q-btn
        rounded
        class="bg-secondary text-white q-ml-sm"
        style="height: 1rem"
        @click="resetValues"
        >Reset</q-btn
      >
    </div>
  </div>

  <div>
    <q-responsive :ratio="3">
      <q-carousel
        swipeable
        autoplay
        animated
        v-model="slide"
        thumbnails
        infinite
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide :name="1" img-src="../assets/slideshow/city.jpg" />
        <q-carousel-slide :name="2" img-src="../assets/slideshow/beach.jpg" />
        <q-carousel-slide :name="3" img-src="../assets/slideshow/bike.jpg" />
        <q-carousel-slide :name="4" img-src="../assets/slideshow/luggage.jpg" />
      </q-carousel>
    </q-responsive>
  </div>

  <div class="flex justify-center">
    <TourCard v-for="t in tours" :key="t" :t="t"></TourCard>
  </div>
</template>
