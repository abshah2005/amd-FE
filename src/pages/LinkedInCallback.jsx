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
        const response = await mutation.mutateAsync({code});
        const email=response.data.user.email;
        console.log("LinkedIn auth response:", response);
        console.log(email)
       if(response.data.user.isRegistrationComplete){
        console.log(response.data.accessToken);
          navigate("/", { state: {  } });
       }
        else {
          navigate("/onboard", { state: { email } });
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