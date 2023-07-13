import { useUserStore } from '@/stores/user';
import { ApiError } from '@/api/model/error';
import { useUIStore } from '@/stores/ui';

export const errorHandler = (err: unknown) => {
  const userStore = useUserStore();
  const UIStore = useUIStore();

  if (err instanceof ApiError) {
    UIStore.displayError(err.message);

    if (userStore.isLoggedIn && (err.status === 401 || err.status === 403)) {
      UIStore.displayError('You have been logged out');
      return userStore.logout();
    }
  }
  console.error(err);
};
