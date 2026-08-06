import api from "./api";

/**
 * Register a new user
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Login user
 */
export const login = async (credentials) => {
  try {
    const formData = new URLSearchParams();

    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await api.post("/auth/login", formData,  {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Save JWT
    localStorage.setItem("access_token", response.data.access_token);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("access_token");
};

/**
 * Get stored JWT
 */
export const getToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

/**
 * Get the currently authenticated user's profile
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
