import apiClient from './apiClient';

async function patchData(url, data) {
  try {
    const response = await apiClient.patch(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default patchData;
