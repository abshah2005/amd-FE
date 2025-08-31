import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useProfessionalProfile = (fullName, opts = {}) => {
  return useQuery({
    queryKey: ["professional-profile", fullName],
    queryFn: async () => {
      if (!fullName) return null;
      // Encode fullName for URL (spaces, etc.)
      const encodedName = encodeURIComponent(fullName);
      const url = `${API_BASE}/public/professionals/name/${encodedName}`;
      const { data } = await axios.get(url);
      return data?.data || null;
    },
    enabled: !!fullName,
    staleTime: 1000 * 60 * 5,
    ...opts,
  });
};

export default useProfessionalProfile;