import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const snackbar = ref({
    show: false,
    text: '',
    icon: '',
    color: '',
  });

  const displayError = (text: string) => {
    snackbar.value = {
      show: true,
      text,
      icon: 'mdi-alert-circle',
      color: 'error',
    };
  };

  const displaySuccess = (text: string) => {
    snackbar.value = {
      show: true,
      text,
      icon: 'mdi-check-circle',
      color: 'success',
    };
  };

  return {
    snackbar,
    displayError,
    displaySuccess,
  };
});
