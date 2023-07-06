import userApi from '@/api/user.api';
import { Router } from 'vue-router';

const guard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userData = await userApi.get();
    console.log(userData);
    if (to.name !== 'Login' && !userData) {
      next({ name: 'Login' });
    } else if (to.name === 'Login' && userData) {
      next({ name: 'Home' });
    } else {
      next();
    }
  });

  return router;
};

export default guard;
