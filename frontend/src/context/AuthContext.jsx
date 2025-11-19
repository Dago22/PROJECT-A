import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  useEffect(()=>{ if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`; }, [token]);
  const login = (payload) => { localStorage.setItem('token', payload.token); localStorage.setItem('user', JSON.stringify(payload.user)); setToken(payload.token); setUser(payload.user); };
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); delete api.defaults.headers.common['Authorization']; };
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}
