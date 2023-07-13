<template>
  <v-app-bar border elevation="0">
    <v-app-bar-nav-icon icon="mdi-calculator" color="comment" />
    <v-app-bar-title class="color-secondary"
      >{{ title[0] }}<span>{{ title[1] }}</span>
    </v-app-bar-title>
    <v-spacer />
    <div v-show="userStore.isLoggedIn">
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon border v-bind="props" class="mr-4" color="accent">
            {{ userStore.user.username.at(0) }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="color-comment">Felipe Morales</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              disabled
              prepend-icon="mdi-wallet"
              class="color-secondary"
            >
              Balance ${{ balance }}
            </v-list-item>
            <v-list-item
              @click="userStore.logout"
              variant="plain"
              prepend-icon="mdi-logout"
              class="color-secondary"
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
import { useDisplay } from 'vuetify';

const userStore = useUserStore();
const display = useDisplay();

const title = computed(() => {
  return display.mdAndUp.value ? ['Arithmetic ', 'Calculator'] : ['A', 'C'];
});

const balance = computed(() => {
  return Intl.NumberFormat().format(Number(userStore.user.balance));
});
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
