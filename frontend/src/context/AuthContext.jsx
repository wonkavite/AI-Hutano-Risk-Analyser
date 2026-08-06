import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/authService";

// Create Context
const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  // Authentication state
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  /**
   * Register new user
   */
  const register = async (userData) => {
    try {
      await authService.register(userData);

      // Automatically login after successful registration
      await login({
        email: userData.email,
        password: userData.password,
      });

    } catch (error) {
      throw error;
    }
  };

  /**
   * Login
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

   const profile = await authService.getCurrentUser();

setUser(profile);

setIsAuthenticated(true);

return response;

    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    authService.logout();

    setUser(null);

    setIsAuthenticated(false);
  };

  /**
   * Restore session after refresh
   */
 /**
 * Restore session after page refresh
 */
useEffect(() => {
  const restoreSession = async () => {
    const token = authService.getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getCurrentUser();

      setUser(profile);

      setIsAuthenticated(true);

    } catch (error) {
      authService.logout();

      setUser(null);

      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  restoreSession();
}, []);

  const value = {
    user,

    loading,

    isAuthenticated,

    register,

    login,

    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}