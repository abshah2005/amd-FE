import axios from "axios";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contextProvider/AuthContextProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


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

export const useToggleActiveRole = () => {
  const queryClient = useQueryClient();
  const { refreshCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async (activeRole) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      const url = `${API_BASE_URL}/users/role/active`;
      await axios.post(
        url,
        { activeRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const latest = await refreshCurrentUser();

      if (latest) {
        queryClient.setQueryData(["currentUser"], latest);
      }
      queryClient.invalidateQueries(["currentUser"]);
      queryClient.invalidateQueries(["registrationState"]);

      return latest;
    },
    onSuccess: () => {
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





export const useLinkedInCallback = () =>
  useMutation({
    mutationFn: async ({ code }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/auth/linkedin/callback`,
        { code }
      );
      return res.data;
    },
  });

export const useSignIn = () => {
  return useMutation(async ({ email, password }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      { email, password }
    );
    return response.data;
  });
};



export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (email) => {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/forgotPassword`,
        { email }
      );
      return data;
    },
  });

export default function useUpdateProfile(options = {}) {
  return useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      const res = await axios.put(`${API_BASE_URL}/users/updateinfo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    ...options,
  });
}

export const useRegisterStep4 = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.put(
        `${API_BASE_URL}/users/register/step4`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
  });
};

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
