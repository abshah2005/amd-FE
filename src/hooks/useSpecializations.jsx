import { useState, useEffect } from "react";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const useSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/specializations/`);
        
        setSpecializations(response.data.data || []);
        console.log(specializations);
        
        
        // Extract all subcategories for tags
        const allSubCats = response.data.data.flatMap(spec => spec.subCategories);
        setAllSubCategories([...new Set(allSubCats)]); // Remove duplicates
        
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch specializations");
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  // Fetch top categories
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/specializations/top`);
        setTopCategories([
          { id: "All", name: "All" },
          ...response.data.data.map(cat => ({
            id: cat._id,
            name: cat.category
          }))
        ]);
      } catch (err) {
        console.error("Failed to fetch top categories:", err);
      }
    };

    fetchTopCategories();
  }, []);

  return {
    specializations,
    topCategories,
    allSubCategories, // Use this for tags
    loading,
    error
  };
};

export default useSpecializations;