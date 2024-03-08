<script setup>
import { ref, onMounted } from 'vue';
import SideBar from './SideBar.vue';
import LoginBox from './LoginBox.vue';
import { showLoginForm, hasToLogin } from '../utils/dialogToggle.js';
import { onlineTest, isOnline, toggleDialog } from '../utils/onlineTest.js';
import { useUserStore } from '../stores/userStore.js';
import { storeToRefs } from 'pinia';

const customerStore = useUserStore();
const { cid } = storeToRefs(customerStore);

const update = ref(false);

onMounted(async () => {
  await customerStore.checkLogin();
  if (cid.value) hasToLogin.value = false;
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.addEventListener('updatefound', () => (update.value = true));
    if (registration.skipWaiting) update.value = true;
  }

  window.addEventListener('online', () => {
    isOnline.value = true;
    toggleDialog.value = false;
  });
  window.addEventListener('offline', () => {
    isOnline.value = false;
    toggleDialog.value = true;
  });
  isOnline.value = await onlineTest();
});

const updateWorker = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value);
</script>

<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        GlobeVista
        <q-img
          src="http://localhost:3000/staticImages/travel.png"
          class="q-ml-md q-mt-xs q-mb-sm"
          style="width: 50px"
      /></q-toolbar-title>
      <!-- <q-btn flat color="negative" v-if="!isOnline"
        >You are offline! Some functions may be unavailable!</q-btn
      > -->

      <q-btn class="q-mr-md bg-negative" v-if="update" @click="updateWorker">Update Now!</q-btn>
      <q-btn
        flat
        color="warning"
        class="q-mr-md"
        @click="showLoginForm = !showLoginForm"
        v-if="hasToLogin && isOnline"
        >Login</q-btn
      >
      <q-btn flat>
        <q-img
          src="http://localhost:3000/staticImages/bars-solid.svg"
          class="q-mt-xs q-mb-sm"
          style="width: 25px"
          @click="toggleRightDrawer"
        />
      </q-btn>
    </q-toolbar>
  </q-header>
  <SideBar v-model="rightDrawerOpen"></SideBar>
  <LoginBox v-model="showLoginForm"></LoginBox>
  <q-dialog v-model="toggleDialog" position="top">
    <q-card style="width: 350px">
      <q-card-section class="row items-center justify-center no-wrap">
        <div>
          <div class="text-weight-bold text-negative q-ml-xl">You are offline!</div>
          <div class="text-grey q-ml-sm">Some functions may not work!</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
