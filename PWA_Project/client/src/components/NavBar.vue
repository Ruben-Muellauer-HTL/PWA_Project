<script setup>
import { ref } from 'vue';
import SideBar from './SideBar.vue';
const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value);
</script>

<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title> GlobeVista </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
  <SideBar v-model="rightDrawerOpen"></SideBar>
</template>
