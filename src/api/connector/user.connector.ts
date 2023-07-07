import { ApiResponse } from '@/api/api.model';
import interceptor, { USER_ID_KEY } from '@/api/connector/interceptor';

const basePath = '/api/v1/users/';

type ReturnType<TResponse> = TResponse extends void
  ? void
  : ApiResponse<TResponse>;
const userConnector = async <TResponse>(
  path = '',
  options: RequestInit = {}
): Promise<ReturnType<TResponse>> => {
  const userId = sessionStorage.getItem(USER_ID_KEY);

  if (!userId) throw new Error('User not logged in');

  const response = await interceptor(`${basePath}${userId}${path}`, options);

  if (!response.ok) throw new Error('Error fetching user resource');

  if (response.status === 204)
    return undefined as unknown as ReturnType<TResponse>;

  return (await response.json()) as ReturnType<TResponse>;
};

export default userConnector;
