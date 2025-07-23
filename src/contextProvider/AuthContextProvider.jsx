import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getcurrent`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUser(res.data))
      .catch(() => {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, { email, password });
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    const userRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getcurrent`, {
      headers: { Authorization: `Bearer ${data.data.accessToken}` },
    });
    setUser(userRes.data);
  };

  // Login with LinkedIn callback
  const loginWithLinkedIn = async (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    // Fetch current user after LinkedIn login
    const userRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getcurrent`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setUser(userRes.data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/signin")
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithLinkedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}