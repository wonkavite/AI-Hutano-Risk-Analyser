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
 * Login with Google
 */
export const googleLogin = async (idToken, username = null) => {
  try {
    const response = await api.post("/auth/google", {
      id_token: idToken,
      username: username,
    });

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



/**
 * Link Google account to existing account
 */
export const linkGoogleAccount = async (idToken, password) => {
  try {
    const response = await api.post("/auth/google/link", {
      id_token: idToken,
      password: password,
    });

    // Save JWT returned after successful linking
    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



/**
 * Logout
 */
export const logout = async () => {
  try {
    if (getToken()) {
      await api.post("/auth/logout");
    }
  } catch {
    // Local cleanup is still required when the server session is unavailable.
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_user");
  }
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












