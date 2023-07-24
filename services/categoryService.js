import http from './httpService';

const apiEndpoint = '/categories';

export const getCategories = () => http.get(apiEndpoint);

export const createCategory = (name) => http.post(apiEndpoint, name);

export const updateCategory = (categoryId, data) =>
  http.patch(`${apiEndpoint}/${categoryId}`, data);
