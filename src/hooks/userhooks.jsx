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
      // queryClient.invalidateQueries(["answers"]);
      // queryClient.invalidateQueries(["questions"]);


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

  export const useLinkedInLinkCallback = () =>
  useMutation({
    mutationFn: async ({ code, userId }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/auth/linkedin/linkCallback`,
        { code, userId }
      );
      return res.data;
    },
  });



export const useStripeOnboardingStatus = (professionalId) => {
  return useQuery({
    queryKey: ['stripeOnboardingStatus', professionalId],
    queryFn: async () => {
      if (!professionalId) return null;
      const { data } = await axios.get(`${API_BASE_URL}/onboarding/status/${professionalId}`);
      return data;
    },
    enabled: !!professionalId,
    refetchInterval: 5000, // Refresh every 5 seconds while onboarding
  });
};

// Hook to initiate Stripe onboarding
export const useOnboardToStripe = () => {
  return useMutation({
    mutationFn: async (professionalId) => {
      const { data } = await axios.post(`${API_BASE_URL}/onboarding/stripe`, {
        professionalId,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.accountLink) {
        window.location.href = data.accountLink; // Redirect to Stripe onboarding
      }
    },
  });
};

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


export const useRequestProfileDeletion = () => {
  const queryClient = useQueryClient();
  const { refreshCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async (profileType = "professional") => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");
      const res = await axios.delete(`${API_BASE_URL}/account/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { profileType },
      });
      return res.data;
    },
    onSuccess: async () => {
      await refreshCurrentUser();
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useCancelProfileDeletion = () => {
  const queryClient = useQueryClient();
  const { refreshCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async (profileType = "professional") => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");
      const res = await axios.post(
        `${API_BASE_URL}/account/cancel-deletion`,
        { profileType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: async () => {
      await refreshCurrentUser();
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};


export const useToggleProfessionalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ professionalId, featured }) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      const url = `${API_BASE_URL}/users/update/professional/status`;
      const { data } = await axios.put(
        url,
        { professionalId, featured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboardUsers","professionals"]);
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
