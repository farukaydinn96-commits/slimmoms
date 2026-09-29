import axios from 'axios';

const ORIGIN = (
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

const instance = axios.create({
  baseURL: `${ORIGIN}/api`,
  withCredentials: true,
});

let isRefreshing = false;
let waitQueue = [];

instance.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;
    const status = error.response?.status;

    if (!error.response || original?._retry) {
      return Promise.reject(error);
    }

    if (
      status === 401 &&
      !original.url.endsWith('/users/refresh') &&
      !original.url.endsWith('/users/current')
    ) {
      original._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          await instance.post('/users/refresh', null, {
            withCredentials: true,
          });

          waitQueue.forEach(resolve => resolve());
          waitQueue = [];
          isRefreshing = false;
        } else {
          await new Promise(resolve => waitQueue.push(resolve));
        }

        return instance(original);
      } catch (e) {
        isRefreshing = false;
        waitQueue = [];
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
