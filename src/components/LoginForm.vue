<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="300">
      <v-card-title class="my-4">
        <v-card class="py-3">
          <v-card-title>
            <v-row justify="end" class="px-2" color="white">
              <h4>Login</h4>
            </v-row>
          </v-card-title>
        </v-card>
      </v-card-title>
      <v-card-text class="mt-12">
        <v-text-field
          label="username"
          v-model="username"
          append-inner-icon="mdi-account-outline"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password"
          label="password"
          append-inner-icon="mdi-lock-outline"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="login"
          block
          size="x-large"
          variant="outlined"
          color="blue"
        >
          login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { router } from '@/router';
import sessionApi from '@/api/session.api';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const login = async () => {
  await sessionApi.post({
    username: username.value,
    password: password.value,
  });
  await router.push('/home');
};
</script>
<style scoped></style>
```
