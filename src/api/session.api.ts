import { ApiResponse } from '@/api/model/api';
import { SessionResponse } from '@/api/model/session';
import { User } from '@/api/model/user';
import connector from '@/api/connector';

const post = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> => {
  const response = await connector<SessionResponse>('/sessions', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.user;
};

const del = async () => {
  await connector<ApiResponse<void>>('/sessions', {
    method: 'DELETE',
  }).catch(() => undefined);
};

export default {
  post,
  del,
};
