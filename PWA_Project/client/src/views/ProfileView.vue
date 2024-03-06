<script setup>
import { ref, computed } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { useUserStore } from '../stores/userStore.js';
import { storeToRefs } from 'pinia';
import TourCard from '../components/TourCard.vue';
import { notifySuccess, notifyWarning } from '../composable/notify.js';

const travelStore = useTravelStore();
const { customerInfo, tours } = storeToRefs(travelStore);

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const cityFilter = ref('');

travelStore.getCustomerInfo(4);
travelStore.getCustomerTours(4);

const cancelTour = (val) => {
  try {
    console.log(val);
    travelStore.deleteTour(4, val);
    notifySuccess('The Tour has now been canceled!');
  } catch {
    notifyWarning('Something went wrong! Try again later!');
  }
};

const filteredTours = computed(() => {
  return tours.value.filter(({ city }) => city.includes(cityFilter.value));
});

const tab = ref('info');
</script>

<template>
  <div v-if="username">
    {{ customerInfo }}
    <div class="text-center q-mt-lg text-h3 text-secondary"></div>
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
              <div class="text-center column items-center">
                <span class="text-h5">Informations from your account</span>
                <q-icon class="fa-solid fa-user q-mt-md" color="secondary" size="xl"></q-icon>
                <span class="text-h6">{{ customerInfo.username }}</span>
                <div class="column items-left q-mt-md">
                  <span><b>Name:</b> {{ customerInfo.firstname }} {{ customerInfo.lastname }}</span>
                  <span class="q-ml-md"><b>Email:</b> {{ customerInfo.email }}</span>
                  <span><b>City: </b> {{ customerInfo.city }} {{ customerInfo.plz }}</span>
                  <span><b>Street: </b> {{ customerInfo.street }}</span>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="booked">
              <div class="text-h6 text-center"><span>Your booked tours</span></div>
              <div>
                <q-form class="q-gutter-md q-pa-md row justify-center">
                  <q-input rounded standout label="City" v-model="cityFilter"
                /></q-form>
              </div>
              <div class="row justify-center">
                <TourCard
                  v-for="t in filteredTours"
                  :t="t"
                  :key="t.tid"
                  :del="true"
                  @del="cancelTour"
                ></TourCard>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>
