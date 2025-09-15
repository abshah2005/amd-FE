import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function useProcessBacklogPayments(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (professionalId) => {
      if (!professionalId) throw new Error("professionalId is required");
      const url = `${API_BASE}/onboarding/process-backlog/${encodeURIComponent(
        professionalId
      )}`;
      const { data } = await axios.post(url, {}, { headers: getAuthHeaders() });
      return data;
    },
    onSuccess: (data, variables, context) => {
      // keep caches in sync
      queryClient.invalidateQueries(["professionalStats"]);
      queryClient.invalidateQueries(["dashboardStats"]);
      if (typeof options.onSuccess === "function")
        options.onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      console.error("processBacklogPayments failed:", err);
      if (typeof options.onError === "function")
        options.onError(err, variables, context);
    },
    ...options,
  });
}


export default useProcessBacklogPayments;