import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ==========================
// 🔹 Step 1 - Email/LinkedIn Signup
// ==========================
export const useRegisterStep1 = () => {
  return useMutation({
    mutationFn: async ({ email, password, authProvider }) => {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/register/step1`,
        {
          email,
          password,
          authProvider,
        }
      );
      return data;
    },
  });
};

export const useRegisterStep2 = () => {
  return useMutation({
    mutationFn: async ({ email, role }) => {
      const { data } = await axios.put(`${API_BASE_URL}/users/register/step2`, {
        email,
        role,
      });
      return data;
    },
  });
};

// export const useRegisterStep3 = () => {
//   return useMutation({
//     mutationFn: async (formData) => {
//       const { data } = await axios.put(`${API_BASE_URL}/users/register/step3`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       return data;
//     }
//   });
// };

export const useRegisterStep3 = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.put(
        `${API_BASE_URL}/users/register/step3`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    // onSuccess: (data) => {
    // },
    // onError: (error) => {
    // },
  });
};

export const useRegistrationState = (email) => {
  return useQuery({
    queryKey: ["registrationState", email],
    queryFn: async () => {
      if (!email) return null;
      const { data } = await axios.get(`${API_BASE_URL}/users/register/state`, {
        params: { email },
      });
      return data;
    },
    enabled: !!email,
  });
};

// ==========================
// 🔹 LinkedIn Callback - POST from frontend after OAuth
// ==========================
export const useLinkedInCallback = () => {
  return useMutation({
    mutationFn: async (linkedinData) => {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/auth/linkedin/callback`,
        linkedinData
      );
      return data;
    },
  });
};

// ==========================
// 🔹 Get LinkedIn Profile Info (after step 1 or on rehydration)
// ==========================
export const useLinkedInProfile = (email) => {
  return useQuery({
    queryKey: ["linkedinProfile", email],
    queryFn: async () => {
      if (!email) return null;
      const { data } = await axios.get(
        `${API_BASE_URL}/users/profile/linkedin`,
        {
          params: { email },
        }
      );
      return data;
    },
    enabled: !!email,
  });
};
