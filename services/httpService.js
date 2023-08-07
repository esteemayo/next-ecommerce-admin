import axios from 'axios';
import { toast } from 'react-hot-toast';

import logger from './logService';

const devEnv = process.env.NODE_ENV !== 'production';
const NEXT_PUBLIC_DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
const NEXT_PUBLIC_PROD_API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
    toast.error('An unexpected error occurred');
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
