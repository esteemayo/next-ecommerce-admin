import http from './httpService';

const apiEndpoint = '/orders';

export const getOrders = () => http.get(apiEndpoint);
