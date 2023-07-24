import http from './httpService';

const apiEndpoint = '/categories';

export const createCategory = (name) => http.post(apiEndpoint, name);
