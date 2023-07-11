import { ApiError } from '@/api/model/error';
import { ApiResponse, PagedApiResponse } from '@/api/model/api';

const basePath = '/api/v1';

type ReturnType<TResponse> = TResponse extends void
  ? void
  : TResponse extends PagedApiResponse<unknown>
  ? TResponse
  : ApiResponse<TResponse>;

const connector = (
  (fetch) =>
  async <TResponse>(
    path: RequestInfo | URL,
    options?: RequestInit
  ): Promise<ReturnType<TResponse>> => {
    const result = await fetch(`${basePath}${path}`, options);

    if (!result.ok) {
      try {
        const response: ApiResponse<unknown> = await result.json();
        return Promise.reject(
          new ApiError(result.status, response.metadata?.error)
        );
      } catch (error) {
        return Promise.reject(new ApiError(result.status));
      }
    }

    if (result.status === 204)
      return undefined as unknown as ReturnType<TResponse>;

    return (await result.json()) as ReturnType<TResponse>;
  }
)(fetch);

export default connector;
