import connector from '@/api/connector';
import { Operation } from '@/api/model/operation';

export const get = async (): Promise<Operation[]> => {
  const response = await connector<Operation[]>(`/operations`);
  return response.data;
};

export default {
  get,
};
