export type Record = {
  id: number;
  operation_id: number;
  user_id: string;
  amount: string;
  user_balance: string;
  operation_response: string;
  date: string;
};

export type RecordQuery = {
  page_size?: string;
  page?: string;
  id?: string;
  operation_id?: string;
  amount?: string;
  user_balance?: string;
  operation_response?: string;
  date?: string;
};
