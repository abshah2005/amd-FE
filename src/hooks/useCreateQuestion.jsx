import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (questionData) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");
      
      const formData = new FormData();
      
      // Add text fields
      formData.append("professionalId", questionData.professionalId);
      formData.append("title", questionData.description.substring(0, 100)); // First 100 chars as title
      formData.append("body", questionData.description);
      formData.append("deliveryType", questionData.deliveryTime.toLowerCase());
      
      if (questionData.budget) {
        formData.append("budget", questionData.budget);
      }
      
      if (questionData.editorState) {
        formData.append("editorState", JSON.stringify(questionData.editorState));
      }
      
      // Add images
      if (questionData.images && questionData.images.length > 0) {
        questionData.images.forEach((img) => {
          formData.append("attachments", img);
        });
      }
      
      const { data } = await axios.post(`${API_BASE_URL}/questions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      return data;
    },
    
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      // Also invalidate pending questions for the professional dashboard if applicable
      queryClient.invalidateQueries({ queryKey: ["pendingQuestions"] });
    },
  });
}