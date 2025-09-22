import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 1. Dashboard stats hook
export function useDashboardStats(options = {}) {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/admin/dashboard/stats`,
        { headers: getAuthHeaders() }
      );
      return data?.data || {};
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

// 2. Dashboard users hook (professionals/askers)
export function useDashboardUsers(type = "professional", page = 1, limit = 20, options = {},search="") {
  return useQuery({
    queryKey: ["dashboardUsers", type, page, limit,search],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/admin/dashboard/users`,
        {
          params: { type, page, limit },
          headers: getAuthHeaders(),
        }
      );
      return data?.data?.results || [];
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    ...options,
  });
}


export function useProfessionalStats() {
  return useQuery({
    queryKey: ["professionalStats"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/admin/dashboard/stats/prof`, {
          headers: getAuthHeaders(),
        });
      return data?.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

// export function usePendingQuestions() {
//   return useQuery({
//     queryKey: ["pendingQuestions"],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_BASE_URL}/admin/dashboard/pending`, {
//           headers: getAuthHeaders(),
//         });
//       return data?.data;
//     },
//     staleTime: 1000 * 60 * 2,
//   });
// }


export function usePendingQuestions(page = 1, limit = 10, search = "") {
  return useQuery({
    queryKey: ["pendingQuestions", page, limit, search],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/admin/dashboard/pending`, {
        params: { page, limit, search },
        headers: getAuthHeaders(),
      });
      return data?.data;
    },
    keepPreviousData: true, // Keep previous data while fetching new data
    staleTime: 1000 * 60 * 2,
  });
}