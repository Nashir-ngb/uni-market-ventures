import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: !!localStorage.getItem('token'),
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('username') || null,
  });

  // Optional: keep localStorage in sync when user changes
  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username || '');
    } else {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
