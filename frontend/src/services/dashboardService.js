import api from "./api";

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/assessment/dashboard");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};