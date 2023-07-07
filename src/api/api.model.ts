export type ApiResponse<TData> = {
  data: TData;
  metadata?: {
    page_size?: number;
    total_count?: number;
    total_pages?: number;
  };
};
