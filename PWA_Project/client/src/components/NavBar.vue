<script setup>
import { ref, onMounted } from 'vue';
import SideBar from './SideBar.vue';
import LoginBox from './LoginBox.vue';
import { showLoginForm, hasToLogin } from '../utils/dialogToggle.js';
import { onlineTest, isOnline } from '../utils/onlineTest.js';

const update = ref(false);

onMounted(async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.addEventListener('updatefound', () => (update.value = true));
    if (registration.skipWaiting) update.value = true;
  }

  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
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
      <q-toolbar-title> GlobeVista </q-toolbar-title>
      <q-btn flat color="negative" v-if="!isOnline"
        >You are offline! Some functions may be unavailable!</q-btn
      >

      <q-btn class="q-mr-md bg-negative" v-if="update" @click="updateWorker">Update Now!</q-btn>
      <q-btn
        flat
        color="warning"
        class="q-mr-md"
        @click="showLoginForm = !showLoginForm"
        v-if="hasToLogin && isOnline"
        >Login</q-btn
      >
      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
  <SideBar v-model="rightDrawerOpen"></SideBar>
  <LoginBox v-model="showLoginForm"></LoginBox>
</template>
