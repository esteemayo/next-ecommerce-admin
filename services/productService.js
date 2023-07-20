import http from './httpService';

const apiEndpoint = '/products';

export const getProducts = () => http.get(apiEndpoint);

export const getProductById = (productId) =>
  http.get(`${apiEndpoint}/${productId}`);

export const getProductBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createProduct = (product) => http.post(apiEndpoint, product);
