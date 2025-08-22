import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLinkedInCallback } from "../hooks/userhooks";
import { useAuth } from "../contextProvider/AuthContextProvider";

export const LinkedInCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = params.get("code");
  const state = params.get("state");

  const mutation = useLinkedInCallback();
  const { loginWithLinkedIn } = useAuth();

  useEffect(() => {
    const finishAuth = async () => {
      try {
        const response = await mutation.mutateAsync({ code });
        const email = response.data.user.email;
        const name = response.data.user.firstName;
        if (response.data.user.isRegistrationComplete) {
          await loginWithLinkedIn(response.data.accessToken);
          navigate("/", { state: {} });
        } else {
          navigate("/onboard", { state: { email,name } });
        }
      } catch (err) {
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