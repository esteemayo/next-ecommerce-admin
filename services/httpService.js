import axios from 'axios';
import logger from './logService';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(null, (error) => {
  const expectedError = error.response &&
    error.response.status > 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
  }

  return Promise.reject(error);
});

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
