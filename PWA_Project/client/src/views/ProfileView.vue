<script setup>
import { db, openDatabase } from '../utils/db';
import { ref, computed, onMounted, toRaw, watch } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { useUserStore } from '../stores/userStore.js';
import { storeToRefs } from 'pinia';
import TourCard from '../components/TourCard.vue';
import { notifySuccess, notifyWarning } from '../composable/notify.js';
import { onlineTest, isOnline } from '../utils/onlineTest.js';

const travelStore = useTravelStore();
const { customerInfo, tours } = storeToRefs(travelStore);

const userStore = useUserStore();
const { username, cid } = storeToRefs(userStore);

const cityFilter = ref('');
const newUsername = ref('');
const prompt = ref(false);

const errorMessage = ref(null);

watch(isOnline, () => synchronize(isOnline));

onMounted(async () => {
  if (!db) await openDatabase();
  await userStore.checkLogin();
  if (cid.value) {
    isOnline.value = await onlineTest();
    travelStore.getCustomerInfo(cid.value);
    if (isOnline.value) {
      await travelStore.getCustomerTours(cid.value);
      tours.value = tours.value.map((el) => ({ ...el, isDeleted: false }));
      db.clear('tours');
      tours.value.forEach((e) => db.put('tours', toRaw(e)));
    } else {
      let data = await db.getAll('tours');
      tours.value = data.filter((el) => !el.isDeleted);
      return;
    }
  }
});

const fetchTours = async () => {
  isOnline.value = await onlineTest();
  travelStore.getCustomerInfo(cid.value);
  if (isOnline.value) {
    travelStore.getCustomerTours(cid.value);
    tours.value = tours.value.map((el) => ({ ...el, isDeleted: false }));

    db.clear('tours');
    tours.value.forEach((e) => db.put('tours', toRaw(e)));
  } else {
    let data = await db.getAll('tours');
    tours.value = data.filter((el) => !el.isDeleted);
    return;
  }
};

const cancelTour = async (val) => {
  try {
    isOnline.value = await onlineTest();
    if (isOnline.value) {
      travelStore.deleteTour(cid.value, val);
      deleteFromIndex(val);
      fetchTours();
    } else {
      let tou = await db.get('tours', parseInt(val));
      tou.isDeleted = true;
      db.put('tours', toRaw(tou));
      fetchTours();
    }
    notifySuccess('The Tour has now been canceled!');
  } catch {
    notifyWarning('Something went wrong! Try again later!');
  }
};

const deleteFromIndex = (id) => {
  db.delete('tours', id);
};

const synchronize = async (online) => {
  if (online.value) {
    let toDelete = await db.getAll('tours');
    toDelete.forEach((e) => {
      if (e.isDeleted == true) cancelTour(e.tid);
    });
    fetchTours();
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
  <div v-if="cid">
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
                <q-img
                  src="http://localhost:3000/staticImages/user-solid.svg"
                  class="q-mt-md"
                  style="width: 30px"
                />
                <div class="row">
                  <span class="text-h6">{{ customerInfo.username }}</span>
                </div>
                <q-btn flat>
                  <q-img
                    src="http://localhost:3000/staticImages/pen-to-square-solid.svg"
                    style="width: 20px"
                    @click="prompt = true"
                  />
                </q-btn>

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
  <div v-if="!cid" class="row justify-center items-center" style="height: 90vh">
    <div class="bg-negative text-white text-center box items-center row justify-center">
      <span class="text-h6">You need to Login to view this page!</span>
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
