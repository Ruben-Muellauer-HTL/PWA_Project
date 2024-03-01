<script setup>
import { ref } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { storeToRefs } from 'pinia';

const travelStore = useTravelStore();
const { customerInfo } = storeToRefs(travelStore);

travelStore.getCustomerInfo(4);

const tab = ref('info');
</script>

<template>
  <div class="text-center q-mt-lg text-h3 text-secondary">
    <span>Explore your own profile</span>
  </div>
  <div class="row justify-center q-mt-xl">
    <div class="q-gutter-y-md" style="width: 100rem">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="info" label="Information" />
          <q-tab name="booked" label="Booked Tours" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <div class="text-h6">Informations from your account</div>
            {{ customerInfo }}
          </q-tab-panel>

          <q-tab-panel name="booked">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
