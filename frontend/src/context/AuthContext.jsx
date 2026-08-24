import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/authService";
import { signInWithGoogle, signOutFromGoogle } from "../firebase";

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
  const response = await authService.googleLogin(idToken, username);
  await refreshUser();
  return response;
};

const googleAuthenticate = async (username = null) => {
  const result = await signInWithGoogle();
  const idToken = await result.user.getIdToken();

  try {
    const response = await googleLogin(idToken, username);
    return { response, idToken };
  } catch (error) {
    error.googleIdToken = idToken;
    throw error;
  }
};

const linkGoogleAccount = async (idToken, password) => {
  const response = await authService.linkGoogleAccount(idToken, password);
  await refreshUser();
  return response;
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
    await authService.register(userData);

    // Automatically login after successful registration
    await login({
      email: userData.email,
      password: userData.password,
    });
  };

  /**
   * Login
   */
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    await refreshUser();
    return response;
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Local cleanup still completes if the server session is unavailable.
    } finally {
      await signOutFromGoogle().catch(() => undefined);
      syncUser(null, false);
    }
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
    } catch {
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
    googleAuthenticate,
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