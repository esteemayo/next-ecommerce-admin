import http from './httpService';

const apiEndpoint = '/products';

export const createProduct = (product) => http.post(apiEndpoint, product);
