import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const refreshCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      return null;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/getcurrent`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      return res.data;
    } catch (err) {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshCurrentUser();
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      { email, password }
    );
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    await refreshCurrentUser();
  };

  const loginWithLinkedIn = async (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    await refreshCurrentUser();
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await queryClient.cancelQueries();
    queryClient.clear();
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        loginWithLinkedIn,
        logout,
        refreshCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
