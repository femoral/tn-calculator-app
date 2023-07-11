import connector from '@/api/connector';
import { PagedApiResponse } from '@/api/model/api';
import { Record, RecordQuery } from '@/api/model/record';
import { OperationExecution } from '@/api/model/operation';

const get = async (userId: string, query: RecordQuery) => {
  return await connector<PagedApiResponse<Record>>(
    `/users/${userId}/records?${new URLSearchParams(query)}`,
    {
      cache: 'no-cache',
    }
  );
};

const post = async (userId: string, record: OperationExecution) => {
  const response = await connector<Record>(`/users/${userId}/records`, {
    method: 'POST',
    body: JSON.stringify(record),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const del = async (userId: string, recordId: string) => {
  await connector(`/users/${userId}/records/${recordId}`, {
    method: 'DELETE',
  });
};

export default {
  get,
  post,
  del,
};
