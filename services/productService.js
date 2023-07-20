import http from './httpService';

const apiEndpoint = '/products';

export const getProducts = () => http.get(apiEndpoint);

export const createProduct = (product) => http.post(apiEndpoint, product);
