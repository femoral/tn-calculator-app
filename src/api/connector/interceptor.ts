export const USER_ID_KEY = 'userId';

const interceptor = (
  (fetch) =>
  async (...args: [RequestInfo | URL, RequestInit]) => {
    const result = await fetch.apply(this, args);

    if (result.status === 401 || result.status === 403) {
      sessionStorage.removeItem(USER_ID_KEY);
    }

    return result;
  }
)(fetch);

export default interceptor;
