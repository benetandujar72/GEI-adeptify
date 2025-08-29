'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verificar si hay un usuario guardado en localStorage
    try {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      // Simular llamada a API
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: 'Usuario Demo',
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Simular llamada a API
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  // Evitar errores de hidratación
  if (!mounted) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
