import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'global_admin' | 'sub_admin' | 'hr' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isGlobalAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock authentication - in a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'sanket@example.com' && password === 'password') {
          setUser({
            id: '1',
            name: 'Sanket',
            email: 'sanket@example.com',
            role: 'global_admin'
          });
          resolve(true);
        } else if (email === 'tanmai@example.com' && password === 'password') {
          setUser({
            id: '2',
            name: 'Tanmai',
            email: 'tanmai@example.com',
            role: 'sub_admin'
          });
          resolve(true);
        } else if (email === 'hr@example.com' && password === 'password') {
          setUser({
            id: '3',
            name: 'HR Manager',
            email: 'hr@example.com',
            role: 'hr'
          });
          resolve(true);
        } else {
          resolve(false);
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'global_admin' || user?.role === 'sub_admin';
  };

  const isGlobalAdmin = () => {
    return user?.role === 'global_admin';
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    loading,
    login,
    logout,
    isAdmin,
    isGlobalAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};