import connector from '@/api/connector';
import { User } from '@/api/model/user';

export const get = async (userId: string) => {
  const response = await connector<User>(`/users/${userId}`, {
    cache: 'no-cache',
  });
  return response.data;
};

export default {
  get,
};
