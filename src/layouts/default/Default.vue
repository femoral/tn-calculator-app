<template>
  <v-app>
    <AppBar />

    <DefaultView />

    <v-snackbar v-model="UIStore.snackbar.show" :color="UIStore.snackbar.color">
      <div class="d-flex">
        <div><v-icon :icon="UIStore.snackbar.icon" class="mr-2" /></div>
        <div>{{ UIStore.snackbar.text }}</div>
      </div>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './AppBar.vue';
import DefaultView from './View.vue';
import { useUIStore } from '@/stores/ui';

const UIStore = useUIStore();
</script>
