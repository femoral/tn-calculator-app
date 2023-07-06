<template>
  <v-app-bar border elevation="0">
    <v-app-bar-nav-icon icon="mdi-calculator" />
    <v-app-bar-title> Arithmetic Calculator </v-app-bar-title>
    <v-spacer />
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-btn icon border v-bind="props"> F </v-btn>
      </template>
      <v-card>
        <v-card-title>Felipe Morales</v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item disabled prepend-icon="mdi-wallet">
            Balance $100
          </v-list-item>
          <v-list-item
            @click="logout"
            variant="plain"
            prepend-icon="mdi-logout"
          >
            Logout
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { router } from '@/router';
import sessionApi from '@/api/session.api';

const logout = async () => {
  await sessionApi.del();
  await router.push('/login');
};
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
