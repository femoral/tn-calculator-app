import userConnector from '@/api/connector/user.connector';
import { User } from '@/api/model/user';

export const get = async () => {
  try {
    return await userConnector<User>();
  } catch (e) {
    return;
  }
};

export default {
  get,
};
