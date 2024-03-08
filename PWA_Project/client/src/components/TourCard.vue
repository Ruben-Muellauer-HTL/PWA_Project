<script setup>
import { ref } from 'vue';
import TourDialog from './TourDialog.vue';

defineProps({ t: Object, del: Boolean });
const emits = defineEmits('del');

const isActive = ref(false);
const accept = ref(false);
const verify = ref('');

const confirmCancel = (id) => {
  if (verify.value === 'confirm') {
    emits('del', id);
    accept.value = false;
  }
};
</script>

<template>
  <q-card style="width: 20rem" flat bordered class="q-ma-lg">
    <q-img :src="`http://localhost:3000${t.image}`" height="200px" @click="isActive = !isActive" />

    <q-card-section>
      <q-btn
        fab
        color="negative"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <q-img
          src="http://localhost:3000/staticImages/location-dot-solid_white.svg"
          class="q-mt-md q-ml-sm absolute"
          style="top: 10px; right: 18px; transform: translateY(-50%); width: 20px"
      /></q-btn>

      <div class="row no-wrap items-center q-ml-sm">
        <div class="col text-h6 ellipsis">{{ t.city }}</div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          <q-img
            src="http://localhost:3000/staticImages/location-dot-solid.svg"
            class="q-mr-xs"
            style="width: 10px"
          />
          {{ t.coordinates }}
        </div>
      </div>
      <div class="column">
        <div class="q-ml-sm">
          <span class="text-caption text-grey">({{ t.start_date }} - {{ t.end_date }})</span>
        </div>
        <div>
          <q-img
            src="http://localhost:3000/staticImages/star-solid.svg"
            class="q-mt-md q-ml-sm"
            style="width: 20px"
            v-for="s in t.rating"
          />
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

    <q-card-actions>
      <div class="row justify-center">
        <div>
          <q-img
            src="http://localhost:3000/staticImages/calendar-days-solid.svg"
            class="q-mt-xs q-mb-sm q-ml-md q-mr-sm"
            style="width: 20px"
          />
          <q-btn flat color="primary" :to="`/travel/${t.tid}`"> Explore Details </q-btn>
        </div>
        <div v-if="del">
          <q-img
            src="http://localhost:3000/staticImages/triangle-exclamation-solid.svg"
            style="width: 20px"
          />
          <q-btn flat color="negative" @click="accept = true"> Cancel Tour </q-btn>
        </div>
      </div>
    </q-card-actions>
  </q-card>
  <TourDialog :t="t" v-model="isActive"></TourDialog>

  <q-dialog v-model="accept" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6 text-negative">Please type "confirm" to cancel this tour!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="verify"
          class="text-success"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup />
        <q-btn flat label="Agree" color="success" @click="confirmCancel(t.tid)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
