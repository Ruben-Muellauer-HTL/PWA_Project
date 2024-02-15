<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <NavBar v-if="!$route.meta.hideNavbar"></NavBar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora/Lora-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'LibreBodoni';
  src: url('/fonts/LibreBodoni/LibreBodoni-Regular.ttf') format('truetype');
}

/* * {
  font-family: 'Montserrat';
} */
</style>
