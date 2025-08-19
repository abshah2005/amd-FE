import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchSpecializations = async () => {
  const res = await axios.get(`${API_BASE_URL}/specializations/`);
  return res?.data?.data || [];
};

const useSpecializations = () => {
   const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
    staleTime: 1000 * 60 * 60, 
    cacheTime: 1000 * 60 * 60 * 6, 
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const specializations = data || [];

  const allSubCategories = useMemo(() => {
    if (!Array.isArray(specializations)) return [];
    const all = specializations.flatMap((s) => s.subCategories || []);
    return Array.from(new Set(all));
  }, [specializations]);

  return {
    specializations,
    allSubCategories,
    loading: isLoading,
    error: isError ? (queryError?.message || String(queryError)) : null,
  };
};

export default useSpecializations;