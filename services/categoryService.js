import http from './httpService';

const apiEndpoint = '/categories';

const categoryUrl = (categoryId) => `${apiEndpoint}/${categoryId}`;

export const getCategories = () => http.get(apiEndpoint);

export const createCategory = (name) => http.post(apiEndpoint, name);

export const updateCategory = (categoryId, data) =>
  http.patch(categoryUrl(categoryId), data);
