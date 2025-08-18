import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

export const useProfessionals = (opts = {}) => {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const url = `${API_BASE}/public/professionals?limit=1000`;
      const { data } = await axios.get(url);
      return (data && data.data && data.data.results) || [];
    },
    staleTime: 1000 * 60 * 5,
    ...opts,
  });
};

export default useProfessionals;