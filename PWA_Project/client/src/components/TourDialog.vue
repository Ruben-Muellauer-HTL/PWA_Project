<script setup>
defineProps({ t: Object });
</script>
<template>
  <q-dialog>
    <q-img :src="`http://localhost:3000${t.image}`">
      <div class="bg-positive text-dark text-center absolute-bottom" style="width: 100%">
        <span class="text-h4">{{ t.description }}</span>
      </div>
    </q-img>
  </q-dialog>
</template>
