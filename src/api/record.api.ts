import userConnector from '@/api/connector/user.connector';
import { Record } from '@/api/model/record';

export const get = async () => {
  return userConnector<Record[]>('/records', {});
};

export default {
  get,
};
