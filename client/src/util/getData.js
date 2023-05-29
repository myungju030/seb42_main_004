import apiClient from './apiClient';

async function getData(url) {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default getData;
