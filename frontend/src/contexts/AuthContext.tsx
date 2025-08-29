'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, User, LoginRequest, RegisterRequest } from '@/services/api';

interface AuthContextType {
  user: User | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (typeof window !== 'undefined' && apiService.isAuthenticated()) {
        const response = await apiService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Token inválido, limpiar
          apiService.removeToken();
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      apiService.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      const response = await apiService.login(data);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        setUser(user);
        apiService.setToken(token);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user));
        }
      } else {
        throw new Error(response.error || 'Error en el login');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await apiService.register(data);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        setUser(user);
        apiService.setToken(token);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user));
        }
      } else {
        throw new Error(response.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    apiService.removeToken();
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  // Evitar errores de hidratación
  if (!mounted) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
