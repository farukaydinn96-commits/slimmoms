import axios from 'axios';

const API_URL = 'http://localhost:5001/api/calculator';

export const calculateCaloriesApi = async data => {
  const response = await axios.post(API_URL, data);
  return response.data;
};