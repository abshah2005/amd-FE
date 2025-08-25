import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export function useQuestions({ page = 1, limit = 10, status } = {}) {
  return useQuery({
    queryKey: ["questions", page, limit, status],
    queryFn: async () => {
      const params = { page, limit };
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, { headers: getAuthHeaders(), params });
      return data?.data?.questions || [];
    },
    keepPreviousData: true,
  });
}

export function useAnswers({ page = 1, limit = 10, status } = {}) {
  return useQuery({
    queryKey: ["answers", page, limit, status],
    queryFn: async () => {
      const params = { page, limit };
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, { headers: getAuthHeaders(), params });
      return data?.data?.questions || [];
    },
    keepPreviousData: true,
  });
}