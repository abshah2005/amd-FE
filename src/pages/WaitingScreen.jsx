import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo2 from "../assets/icon.svg";
import { useRegistrationState } from "../hooks/userhooks";
import Navigation from "../components/Navigation";

const WaitingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isRegistered } = location.state || {};
  const email = user?.email;
  const { refetch } = useRegistrationState(email);

  const refetchRef = useRef(refetch);
  const hasNavigatedRef = useRef(false); // 🚀 prevent multiple redirects

  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  useEffect(() => {
    if (!email) return;

    let mounted = true;
    const interval = setInterval(async () => {
      try {
        if (hasNavigatedRef.current) return; // already navigated, don't do anything

        const result = await refetchRef.current();
        const freshData = result?.data?.data;
        console.log("WaitingScreen: registration state", freshData);

        if (!freshData || !mounted) return;

        const payloadUser = freshData.user ?? freshData;
        const role =
          payloadUser?.role ??
          freshData?.role ??
          payloadUser?.activeRole ??
          freshData?.activeRole;

        const registrationComplete =
          freshData.isRegistrationComplete ?? payloadUser?.isRegistrationComplete;

        if (registrationComplete) {
          hasNavigatedRef.current = true; // mark as navigated

          if (role === "asker") {
            navigate("/signupfi", { state: { user: payloadUser }, replace: true });
          } else if (role === "professional" ) {
            navigate("/pofon", { state: { user: payloadUser }, replace: true });
          } else {
            console.log("Unknown role:", role);
          }

          clearInterval(interval); // stop polling
        } else {
          console.log("Registration not complete yet");
        }
      } catch (err) {
        console.error("WaitingScreen refetch error:", err);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      <Navigation source={logo} />
      <div className="flex-1 flex flex-col items-center space-y-10">
        <div className="w-[85%] md:w-1/2 bg-blue-600 rounded-md h-10 flex items-center px-4 mt-5">
          <p className="text-sm text-white font-semibold whitespace-nowrap text-wrap">
            Please hold on tight – while we are setting up your account...
          </p>
        </div>

        <div className="w-[80%] md:w-1/2 px-4">
          <img
            src={logo2}
            alt="Setup Illustration"
            className="w-[40%] h-auto object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default WaitingScreen;
