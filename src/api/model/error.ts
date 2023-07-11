import { ErrorMetadata } from '@/api/model/api';

export class ApiError extends Error {
  status?: number;
  metadata?: ErrorMetadata;
  constructor(status?: number, metadata?: ErrorMetadata) {
    super(metadata?.message ?? 'Unknown error');

    this.status = status;
    this.metadata = metadata;
  }
}
