<script setup>
import { ref } from 'vue';
import SideBar from './SideBar.vue';
import LoginBox from './LoginBox.vue';
import { showLoginForm, hasToLogin } from '../utils/dialogToggle.js';

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value);
</script>

<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title> GlobeVista </q-toolbar-title>

      <q-btn
        flat
        color="warning"
        class="q-mr-md"
        @click="showLoginForm = !showLoginForm"
        v-if="hasToLogin"
        >Login</q-btn
      >
      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
  <SideBar v-model="rightDrawerOpen"></SideBar>
  <LoginBox v-model="showLoginForm"></LoginBox>
</template>
