// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch current user if token exists
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getcurrent`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(res => setUser(res.data))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, { email, password });
//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     setUser(data.user);
//   };

// // const login = async (email, password) => {
// //   const res = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
// //   localStorage.setItem("accessToken", res.data.data.accessToken);
// //   localStorage.setItem("refreshToken", res.data.data.refreshToken);
// //   // Fetch current user
// //   const userRes = await axios.get(`${API_BASE_URL}/users/getcurrent`, {
// //     headers: { Authorization: `Bearer ${res.data.data.accessToken}` }
// //   });
// //   setUser(userRes.data);
// // };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }