import apiClient from './apiClient';

async function postData(url, data) {
  try {
    const response = await apiClient.post(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default postData;
