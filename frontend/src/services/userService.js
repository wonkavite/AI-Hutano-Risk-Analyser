import api from "./api";

// Get logged-in user's profile
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update username/email
export const updateUser = async (data) => {
  try {
    const response = await api.put("/users", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};