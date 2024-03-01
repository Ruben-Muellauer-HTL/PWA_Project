<script setup>
import { ref } from 'vue';
import { showLoginForm } from '../utils/dialogToggle.js';

const username = ref('');
const password = ref('');
const toggleActive = ref(false);

const error = ref('01');

const onReset = () => {
  username.value = '';
  password.value = '';
  toggleActive.value = false;
};
</script>

<template>
  <q-dialog class="q-pa-xl">
    <div style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="bg-white q-pa-xl">
        <q-input
          filled
          v-model="username"
          label="Your Username"
          hint="Type ypur username"
          class="q-mt-md"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password"
          hint="Type your password"
          class="q-mt-md"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-toggle v-model="toggleActive" label="I accept the license and terms" class="q-mt-md" />

        <div class="q-mt-md row justify-between">
          <q-btn label="Login" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" class="q-ml-sm" color="negative" />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>
