<script setup>
import { ref, computed } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { storeToRefs } from 'pinia';
import TourCard from '../components/TourCard.vue';

const travelStore = useTravelStore();

const { allTours } = storeToRefs(travelStore);

travelStore.fetchTours();

let fromFilter = ref(new Date().toJSON().slice(0, 10));
let toFilter = ref('2099-12-12');
let cityFilter = ref('');

let slide = ref(1);

const filteredTours = computed(() => {
  return allTours.value.filter(
    ({ city, start_date, end_date }) =>
      city.includes(cityFilter.value) &&
      start_date >= fromFilter.value &&
      end_date <= toFilter.value,
  );
});
</script>

<template>
  <div class="bg-positive column justify-center">
    <q-form class="q-gutter-md q-pa-md row justify-center">
      <q-input rounded standout label="City" v-model="cityFilter" />
      <q-input rounded standout v-model="fromFilter" mask="date" label="From" :rules="['date']">
        <template v-slot:append>
          <q-img
            src="http://localhost:3000/staticImages/calendar-days-solid.svg"
            class="q-mt-xs q-mb-sm q-mr-md"
            style="width: 20px"
          />
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="fromFilter">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </template>
      </q-input>
      <q-input rounded standout v-model="toFilter" label="To" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-img
            src="http://localhost:3000/staticImages/calendar-days-solid.svg"
            class="q-mt-xs q-mb-sm q-mr-md"
            style="width: 20px"
          />
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="toFilter">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </template>
      </q-input>
    </q-form>
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
        <q-carousel-slide :name="1" img-src="http://localhost:3000/staticImages/city.jpg" />
        <q-carousel-slide :name="2" img-src="http://localhost:3000/staticImages/beach.jpg" />
        <q-carousel-slide :name="3" img-src="http://localhost:3000/staticImages/bike.jpg" />
        <q-carousel-slide :name="4" img-src="http://localhost:3000/staticImages/luggage.jpg" />
      </q-carousel>
    </q-responsive>
  </div>

  <div class="flex justify-center">
    <TourCard v-for="t in filteredTours" :key="t" :t="t" :del="false"></TourCard>
  </div>
</template>
