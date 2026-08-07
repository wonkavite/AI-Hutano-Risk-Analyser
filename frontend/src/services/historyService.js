import api from "./api";

export const getHistory = async () => {
  try {
    const response = await api.get("/assessment/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getHistoryDetails = async (id) => {
  try {
    const response = await api.get(`/assessment/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};