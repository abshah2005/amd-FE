// pages/LinkedInCallback.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLinkedInCallback } from "../hooks/userhooks";

export const LinkedInCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = params.get("code");
  const state = params.get("state");

  const mutation = useLinkedInCallback();

  useEffect(() => {
    const finishAuth = async () => {
      try {
        const response = await mutation.mutateAsync({ code, state });

        if (response.isRegistrationComplete) {
          navigate("/dashboard");
        } else {
          navigate("/signup", {
            state: { email: response.email },
          });
        }
      } catch (err) {
        console.error("LinkedIn auth error:", err);
        navigate("/signup", { state: { error: "LinkedIn authentication failed" } });
      }
    };

    if (code) finishAuth();
  }, [code]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Verifying LinkedIn authentication...</p>
    </div>
  );
};