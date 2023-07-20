import http from './httpService';

const apiEndpoint = '/products';

export const getProducts = () => http.get(apiEndpoint);

export const getProduct = (productId) =>
  http.get(`${apiEndpoint}/${productId}`);

export const createProduct = (product) => http.post(apiEndpoint, product);
