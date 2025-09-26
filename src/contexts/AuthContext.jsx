import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('sg_auth');
    return saved === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sg_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('sg_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) localStorage.setItem('sg_user', JSON.stringify(user));
    else localStorage.removeItem('sg_user');
  }, [user]);

  const login = async (email, password, role = 'admin') => {
    // Mock simples: aceita qualquer email/senha com pelo menos 3 caracteres
    await new Promise((r) => setTimeout(r, 400));
    if (!email || !password || email.length < 3 || password.length < 3) {
      throw new Error('Credenciais inválidas');
    }
    // role pode ser 'admin' ou 'aluno'
    setUser({ email, name: email.split('@')[0], role });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(() => ({ isAuthenticated, user, login, logout }), [isAuthenticated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
