<script setup>
import { ref } from 'vue';
import TourDialog from './TourDialog.vue';
import { isOnline } from '../utils/onlineTest.js';

defineProps({ t: Object, del: Boolean });
const emits = defineEmits('del');

const isActive = ref(false);
const accept = ref(false);
const verify = ref('');
</script>

<template>
  <q-card style="width: 20rem" flat bordered class="q-ma-lg">
    <q-img :src="`http://localhost:3000${t.image}`" height="200px" @click="isActive = !isActive" />

    <q-card-section>
      <q-btn
        fab
        color="negative"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center q-ml-sm">
        <div class="col text-h6 ellipsis">{{ t.city }}</div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          <q-icon name="place" />
          {{ t.coordinates }}
        </div>
      </div>
      <div class="column">
        <div class="q-ml-sm">
          <span class="text-caption text-grey">({{ t.start_date }} - {{ t.end_date }})</span>
        </div>
        <div>
          <q-icon color="warning" class="fa-solid fa-star q-ml-sm" v-for="s in t.rating"></q-icon>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none q-ml-sm">
      <div class="text-subtitle1">{{ t.name }}</div>
      <div class="text-caption text-grey">
        {{ t.slogan }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions v-if="isOnline">
      <div class="row justify-center">
        <div>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary" :to="`/travel/${t.tid}`"> Explore Details </q-btn>
        </div>
        <div v-if="del">
          <q-btn flat round icon="warning" />
          <q-btn flat color="negative" @click="emits('del', t.tid)"> Cancel Tour </q-btn>
        </div>
      </div>
    </q-card-actions>
  </q-card>
  <TourDialog :t="t" v-model="isActive"></TourDialog>
</template>
