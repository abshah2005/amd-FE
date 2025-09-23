import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export function useQuestionsNew({ page = 1, limit = 10, status, search } = {}) {
  return useQuery({
    queryKey: ["questions", page, limit, status, search],
    queryFn: async () => {
      const params = { page, limit };
      if (search) params.search = search;
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
      return {
        questions: data?.data?.questions || [],
        total: data?.data?.total || 0,
        page: data?.data?.page || 1
      };
    },
  });
}

// Update the useAnswers hook similarly
export function useAnswersNew({ page = 1, limit = 10, status, search } = {}) {
  return useQuery({
    queryKey: ["answers", page, limit, status, search],
    queryFn: async () => {
      const params = { page, limit };
      if (search) params.search = search;
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
      return {
        questions: data?.data?.questions || [],
        total: data?.data?.total || 0,
        page: data?.data?.page || 1
      };
    },
  });
}

export function useQuestions({ page = 1, limit = 10, status,search } = {}) {
  return useQuery({
    queryKey: ["questions", page, limit, status,search],
    queryFn: async () => {
      const params = { page, limit };
      if (search) params.search = search;
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
      return data?.data?.questions || [];
    },
    // keepPreviousData: true,
  });
}

export function useLeaveFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, rating, comment }) => {
      const endpoint = `${API_BASE_URL}/questions/${questionId}/feedback`;
      const { data } = await axios.post(
        endpoint,
        { rating, comment },
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["question", variables.questionId]);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to leave feedback:", error);
    },
  });
}

export function useAnswers({ page = 1, limit = 10, status,search } = {}) {
  return useQuery({
    queryKey: ["answers", page, limit, status,search],
    queryFn: async () => {
      const params = { page, limit };
      if (search) params.search = search;
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions`, {
        headers: getAuthHeaders(),
        params,
      });
      return data?.data?.questions || [];
    },
    // keepPreviousData: true,
  });
}


export function useQuestionsByUserType({ userType, userId, page = 1, limit = 10, status } = {}) {
  return useQuery({
    queryKey: ["userQuestions", userType, userId, page, limit, status],
    queryFn: async () => {
      const params = { userType, userId, page, limit };
      if (status) params.status = status;
      const { data } = await axios.get(`${API_BASE_URL}/questions/getQuestions`, {
        headers: getAuthHeaders(),
        params,
      });
      return data?.data || [];
    },
    enabled: !!userType && !!userId,
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

// export function usePostAnswer() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ questionId, body }) => {
//       const endpoint = `${API_BASE_URL}/questions/${questionId}/answer`;

//       const { data } = await axios.post(
//         endpoint,
//         { body },
//         { headers: getAuthHeaders() }
//       );
//       return data;
//     },
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries(["question", variables.questionId]);
//     },
//     onError: (error) => {
//       console.error("Failed to post answer:", error);
//     },
//   });
// }


export function usePostAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, body, attachments } = {}) => {
      const endpoint = `${API_BASE_URL}/questions/${questionId}/answer`;

      // If attachments present, send multipart/form-data
      if (attachments && attachments.length) {
        const form = new FormData();
        if (body) form.append("body", body);
        attachments.forEach((file) => form.append("attachments", file));
        console.log(form);
        const { data } = await axios.post(endpoint, form, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
      }

      // fallback JSON POST
      const { data } = await axios.post(
        endpoint,
        { body },
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["question", variables.questionId]);
    },
    onError: (error) => {
      console.error("Failed to post answer:", error);
    },
  });
}


export function usePostFollowUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, body }) => {
      const endpoint = `${API_BASE_URL}/questions/${questionId}/followup`;

      const { data } = await axios.post(
        endpoint,
        { body },
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["question", variables.questionId]);
    },
    onError: (error) => {
      console.error("Failed to post follow-up:", error);
    },
  });
}

export function useClose() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId,body }) => {
      const endpoint = `${API_BASE_URL}/questions/${questionId}/close`;

      const { data } = await axios.post(
        endpoint,
        {body},
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      queryClient.invalidateQueries(["question", variables.questionId]);
    },
    onError: (error) => {
      console.error("Failed to post follow-up:", error);
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questionId) => {
      const endpoint = `${API_BASE_URL}/questions/${questionId}`;
      await axios.delete(endpoint, { headers: getAuthHeaders() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (error) => {
      console.error("Failed to delete question:", error);
    },
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


// Add this function after the useUpdateQuestionStatus function

export function useFlagQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, reason }) => {
      const { data } = await axios.post(
        `${API_BASE_URL}/questions/${questionId}/flag`,
        { reason },
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question", variables.questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["userQuestions"] });

      
    },
    onError: (error) => {
      console.error("Failed to flag question:", error);
    },
  });
}


export function useReviewFlaggedQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, action, note }) => {
      // Validate action is one of the allowed values
      if (!["reanswer", "refund", "no_action"].includes(action)) {
        throw new Error("Invalid action. Must be reanswer, refund, or no_action");
      }
      
      const { data } = await axios.post(
        `${API_BASE_URL}/questions/${questionId}/review-flag`,
        { action, note },
        { headers: getAuthHeaders() }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["question", variables.questionId] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["userQuestions"] });
      
      // You might want to add specific admin-related query invalidations
      queryClient.invalidateQueries({ queryKey: ["flaggedQuestions"] });
    },
    onError: (error) => {
      console.error("Failed to review flagged question:", error);
    },
  });
}
