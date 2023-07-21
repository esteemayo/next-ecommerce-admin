import http from './httpService';

const apiEndpoint = '/upload';

export const imageUpload = (data) => http.post(apiEndpoint, data);
