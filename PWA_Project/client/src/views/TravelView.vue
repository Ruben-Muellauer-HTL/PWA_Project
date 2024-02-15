<script setup>
import { ref } from 'vue';

let from = ref(null);
let to = ref(null);
let city = ref(null);

let slide = ref(null);
</script>

<template>
  <div class="bg-positive row justify-center">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-md row justify-center">
      <q-input rounded standout label="City" v-model="city" />
      <q-input rounded standout v-model="from" mask="date" label="From" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="from">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input rounded standout v-model="to" label="To" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="to">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-form>
  </div>

  <div>
    <q-responsive :ratio="1.77777">
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
    <q-card style="width: 20rem" flat bordered v-for="i in 20" :key="i" class="q-ma-lg">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Cafe Basilico</div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$・Italian, Cafe</div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary"> Reserve </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
