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
const { username, cid } = storeToRefs(userStore);

const cityFilter = ref('');
const newUsername = ref('');
const prompt = ref(false);

const errorMessage = ref(null);
// travelStore.getCustomerInfo(username.value);
// travelStore.getCustomerTours(4);

const cancelTour = (val) => {
  try {
    travelStore.deleteTour(cid.value, val);
    notifySuccess('The Tour has now been canceled!');
  } catch {
    notifyWarning('Something went wrong! Try again later!');
  }
};

const filteredTours = computed(() => {
  return tours.value.filter(({ city }) => city.includes(cityFilter.value));
});

const changeName = async () => {
  errorMessage.value = await userStore.changeUsername(newUsername.value, username.value);
  if (errorMessage.value) notifyWarning(errorMessage.value);
  else {
    travelStore.getCustomerInfo(cid.value);
    userStore.login(newUsername.value, customerInfo.password);
    notifySuccess(`Your new Username is now ${newUsername.value}`);
    prompt.value = false;
  }
};

const tab = ref('info');
</script>

<template>
  <div v-if="username">
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
                <div class="row">
                  <span class="text-h6">{{ customerInfo.username }}</span>
                  <q-icon
                    color="info"
                    class="fa-solid fa-pen-to-square"
                    @click="prompt = true"
                  ></q-icon>
                </div>
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
  <div v-if="!username" class="row justify-center items-center" style="height: 90vh">
    <div class="bg-negative text-white text-center box items-center row justify-center">
      <span class="text-h6">You need to Login to view this page!</span>
      {{ cid }}
    </div>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Change your Username</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="newUsername" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Change" @click="changeName" />
        {{ cid }}
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss">
.box {
  height: 10rem;
  width: 30rem;
  border-radius: 10px;
}
</style>
