<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="300">
      <v-card-title class="my-4 text-right text-uppercase">
        <div class="color-comment">SIGN IN</div>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="username"
            class="mt-2"
            v-model="username"
            :rules="rules"
            variant="outlined"
            append-inner-icon="mdi-account-outline"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            class="mt-2"
            variant="outlined"
            v-model="password"
            :rules="rules"
            label="password"
            append-inner-icon="mdi-lock-outline"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="() => login()"
          block
          size="x-large"
          variant="tonal"
          color="primary"
        >
          SIGN IN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const rules = [(v: string) => !!v.trim() || 'Required'];

const form = ref<HTMLFormElement>();

const username = ref('');
const password = ref('');

const login = async () => {
  const { valid } = await (form.value?.validate() ?? {});
  if (valid) {
    await userStore.login({
      username: username.value,
      password: password.value,
    });
  }
};
</script>
