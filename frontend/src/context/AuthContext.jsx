import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    // In a real app, you'd verify token with backend
    // For now, we'll check localStorage or cookie
    const checkAuth = async () => {
      try {
        // Could add a verify endpoint
        // const response = await authAPI.verifyToken();
        // if (response.data.user) {
        //   setUser(response.data.user);
        //   setIsAuthenticated(true);
        // }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password, isFoodPartner = false) => {
    try {
      const response = isFoodPartner
        ? await authAPI.loginFoodPartner({ email, password })
        : await authAPI.loginUser({ email, password });

      const userData = response.data.user || response.data.foodPartner;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (data, isFoodPartner = false) => {
    try {
      const response = isFoodPartner
        ? await authAPI.registerFoodPartner(data)
        : await authAPI.registerUser(data);

      const userData = response.data.user || response.data.foodPartner;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async (isFoodPartner = false) => {
    try {
      isFoodPartner ? await authAPI.logoutFoodPartner() : await authAPI.logoutUser();
    } catch (error) {
      // Logout error - continue with clearing local state
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Navigation will be handled by components using this hook
      window.location.href = '/user/login';
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    setUser,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

