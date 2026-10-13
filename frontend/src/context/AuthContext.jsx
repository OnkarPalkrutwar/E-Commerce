import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('urbanstep_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('urbanstep_user', JSON.stringify(user));
        if (user.token) {
          localStorage.setItem('urbanstep_token', user.token);
        }
      } catch (e) {
        console.error('Failed to save user to localStorage', e);
      }
    } else {
      localStorage.removeItem('urbanstep_user');
      localStorage.removeItem('urbanstep_token');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.login({ email, password });
      setUser(data);
      setLoading(false);
      return { success: true, user: data };
    } catch (err) {
      setAuthError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, phone = '') => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.register({ name, email, password, phone });
      setUser(data);
      setLoading(false);
      return { success: true, user: data };
    } catch (err) {
      setAuthError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urbanstep_user');
    localStorage.removeItem('urbanstep_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        authError,
        setAuthError,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
