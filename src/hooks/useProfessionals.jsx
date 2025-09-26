import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useDebouncedValue from "./useDebouncedValue";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}



export const useProfessionals = (filters = {}, opts = {}) => {
  // debounce filters to avoid rapid requests when user toggles filters
  const debouncedFilters = useDebouncedValue(filters, opts.debounceTime ?? 500);

  return useQuery({
    queryKey: ["professionals", debouncedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(debouncedFilters || {}).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (Array.isArray(v)) {
          if (v.length === 0) return;
          params.set(k, v.join(","));
        } else {
          params.set(k, String(v));
        }
      });
      const url = `${API_BASE}/public/professionals?${params.toString()}`;
      const { data } = await axios.get(url,{headers:getAuthHeaders()});
      return data && data.data ? data.data : { results: [], page: 1, limit: debouncedFilters.limit || 20, total: 0 };
    },
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
    ...opts,
  });
};

export default useProfessionals;