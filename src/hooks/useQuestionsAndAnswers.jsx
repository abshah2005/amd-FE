import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
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
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
      return data?.data?.questions || [];
    },
    keepPreviousData: true,
  });
}

export function useGetQuestion(id) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      if (!id) return null;

      const { data } = await axios.get(`${API_BASE_URL}/questions/${id}`, {
        headers: getAuthHeaders(),
      });

      return data?.data || null;
    },
    enabled: !!id,
  });
}

export function useUpdateQuestionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action, payload }) => {
      const { data } = await axios.post(
        `${API_BASE_URL}/questions/${id}/${action}`,
        payload,
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
    onError: (error) => {
      console.error("Failed to update question status:", error);
    },
  });
}
