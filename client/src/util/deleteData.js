import apiClient from './apiClient';

async function deleteData(url) {
  try {
    const response = await apiClient.delete(url);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default deleteData;
