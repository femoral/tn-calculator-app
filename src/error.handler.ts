import { useUserStore } from '@/stores/user';
import { ApiError } from '@/api/model/error';
import { ComponentPublicInstance } from 'vue';

export const errorHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => {
  const { logout } = useUserStore();

  if (err instanceof ApiError) {
    if (err.status === 401 || err.status === 403) {
      logout();
    }
  }
  console.error(err);
  console.error(info);
};
