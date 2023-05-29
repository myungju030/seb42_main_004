import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    withCredentials: true,
  },
});

apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default apiClient;
