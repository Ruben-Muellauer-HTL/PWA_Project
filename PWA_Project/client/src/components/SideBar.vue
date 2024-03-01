<template>
  <q-drawer side="right" bordered class="bg-positive">
    <q-toolbar class="bg-primary text-white text-center shadow-2">
      <q-toolbar-title>GlobeVista</q-toolbar-title>
    </q-toolbar>
    <q-list>
      <q-item clickable v-ripple to="/" class="text-center">
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-house" size="xs" />
        </q-item-section>
        <q-item-section><span class="text-h6 text-secondary">Home</span></q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-house" size="xs" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/travel" class="text-center">
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-map" size="xs" />
        </q-item-section>
        <q-item-section><span class="text-h6 text-secondary">Tours</span></q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-map" size="xs" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/profile" class="text-center">
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-user" size="xs" />
        </q-item-section>
        <q-item-section><span class="text-h6 text-secondary">Profile</span></q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-user" size="xs" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/about" class="text-center">
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-address-card" size="xs" />
        </q-item-section>
        <q-item-section><span class="text-h6 text-secondary">About</span></q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" class="fa-solid fa-address-card" size="xs" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
