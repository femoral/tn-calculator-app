<template>
  <v-app-bar border elevation="0">
    <v-app-bar-nav-icon icon="mdi-calculator" />
    <v-app-bar-title> Arithmetic Calculator </v-app-bar-title>
    <v-spacer />
    <div v-show="userStore.isLoggedIn">
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon border v-bind="props"> F </v-btn>
        </template>
        <v-card>
          <v-card-title>Felipe Morales</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item disabled prepend-icon="mdi-wallet">
              Balance ${{ balance }}
            </v-list-item>
            <v-list-item
              @click="userStore.logout"
              variant="plain"
              prepend-icon="mdi-logout"
            >
              Logout
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const balance = computed(() => {
  return Intl.NumberFormat().format(Number(userStore.user.balance));
});
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
