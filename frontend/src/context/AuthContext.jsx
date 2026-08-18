import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/authService";

const readStoredUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

// Create Context
const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  // Authentication state
  const [user, setUser] = useState(() => readStoredUser());

  const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getToken());

  

const googleLogin = async (idToken, username = null) => {
  try {
    const response = await authService.googleLogin(
      idToken,
      username
    );

    await refreshUser();

    return response;
  } catch (error) {
    throw error;
  }
};


const linkGoogleAccount = async (idToken, password) => {
  try {
    const response = await authService.linkGoogleAccount(
      idToken,
      password
    );

    await refreshUser();

    return response;
  } catch (error) {
    throw error;
  }
};







  const [loading, setLoading] = useState(true);

  const syncUser = (profile, authenticated = true) => {
    if (profile) {
      setUser(profile);
      setIsAuthenticated(authenticated);
      localStorage.setItem("auth_user", JSON.stringify(profile));
      return;
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
  };

  const refreshUser = async (profileOverride) => {
    try {
      const profile = profileOverride ?? (await authService.getCurrentUser());
      syncUser(profile, true);
      return profile;
    } catch (error) {
      syncUser(null, false);
      throw error;
    }
  };

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
      await refreshUser();
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
    syncUser(null, false);
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
      await refreshUser();
    } catch (error) {
      authService.logout();
      syncUser(null, false);
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
    googleLogin,
    linkGoogleAccount,
    logout,
    refreshUser,
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