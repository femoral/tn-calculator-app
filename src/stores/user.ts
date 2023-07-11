import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { User, UserCredentials } from '@/api/model/user';
import sessionApi from '@/api/session.api';
import { useRouter } from 'vue-router';
import userApi from '@/api/user.api';

export const useUserStore = defineStore('user', () => {
  const emptyUser = {
    id: '',
    balance: '',
    username: '',
  };
  const user = ref<User>(emptyUser);

  const updateUser = async () => {
    const userId = sessionStorage.getItem('userId');

    try {
      if (userId) return (user.value = await userApi.get(userId));
    } catch (error) {
      sessionStorage.removeItem('userId');
    }

    return (user.value = emptyUser);
  };

  const router = useRouter();

  const isLoggedIn = computed(() => {
    return !!user.value.id;
  });

  const login = async (credentials: UserCredentials) => {
    user.value = await sessionApi.post(credentials);
    sessionStorage.setItem('userId', user.value.id);
    await router.push({ name: 'Home' });
  };

  const logout = async () => {
    sessionStorage.removeItem('userId');
    await sessionApi.del();
    user.value = emptyUser;
    await router.push({ name: 'Login' });
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    updateUser,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
