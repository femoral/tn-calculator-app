import { Router } from 'vue-router';
import { useUserStore } from '@/stores/user';

const guard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    await userStore.updateUser();

    if (to.name !== 'Login' && !userStore.isLoggedIn) {
      return next({ name: 'Login' });
    }

    if (to.name === 'Login' && userStore.isLoggedIn) {
      return next({ name: 'Home' });
    }

    return next();
  });

  return router;
};

export default guard;
