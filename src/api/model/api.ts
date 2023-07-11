export type ApiResponse<TData> = {
  data: TData;
  metadata?: Metadata;
};

export type PagedApiResponse<TData> = {
  data: TData[];
  metadata: Metadata & PageMetadata;
};

export type Metadata = {
  error?: ErrorMetadata;
};

export type PageMetadata = {
  page_size: number;
  total_count: number;
  total_pages: number;
};

export type ErrorMetadata = {
  code: string;
  type: string;
  message: string;
};
