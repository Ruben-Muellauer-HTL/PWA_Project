<script setup>
defineProps({ t: Object });
</script>

<template>
  <q-card style="width: 20rem" flat bordered class="q-ma-lg">
    <q-img :src="`http://localhost:3000${t.image}`" height="200px" />

    <q-card-section>
      <q-btn
        fab
        color="negative"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center q-ml-sm">
        <div class="col text-h6 ellipsis">{{ t.city }}</div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          <q-icon name="place" />
          {{ t.coordinates }}
        </div>
      </div>
      <div class="column">
        <div class="q-ml-sm">
          <span class="text-caption text-grey">({{ t.start_date }} - {{ t.end_date }})</span>
        </div>
        <div>
          <q-icon color="warning" class="fa-solid fa-star q-ml-sm" v-for="s in t.rating"></q-icon>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none q-ml-sm">
      <div class="text-subtitle1">{{ t.name }}</div>
      <div class="text-caption text-grey">
        {{ t.slogan }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" />
      <q-btn flat color="primary"> Explore Details </q-btn>
    </q-card-actions>
  </q-card>
</template>
