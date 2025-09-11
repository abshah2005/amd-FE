import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLinkedInLinkCallback } from "../hooks/userhooks";

export const LinkedInLinking = () => {
  const [params] = useSearchParams();
  console.log("Params:", Object.fromEntries(params.entries()));
  const navigate = useNavigate();
  const code = params.get("code");
  let userId = null;
  try {
    const rawState = params.get("state");
    if (rawState) {
      const parsedState = JSON.parse(rawState);
      console.log(parsedState)
      userId = parsedState.userId;
      print(userId)
    }
  } catch (err) {
    console.error("Failed to parse state:", err);
  }

  const mutation = useLinkedInLinkCallback();

  useEffect(() => {
    const finishLinking = async () => {
      try {
        await mutation.mutateAsync({ code, userId });
        alert("LinkedIn account linked successfully!");
        navigate("/", { state: { message: "LinkedIn account linked successfully!" } });
      } catch (err) {
        alert("Failed to link LinkedIn account. Please try again.",err);
        navigate("/profile", { state: { error: "Failed to link LinkedIn account" } });
      }
    };

    if (code && userId) finishLinking();
  }, [code, userId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Linking your LinkedIn account...</p>
    </div>
  );
};

export default LinkedInLinking;