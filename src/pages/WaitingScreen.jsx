import React, { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Screenshot 2025-07-16 154906.png";
import logo2 from "../assets/waiting.png";
import { useRegistrationState } from "../hooks/userhooks";
// import { useNavigationBlocker } from "../hooks/NavigationBlocker";

const WaitingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const email = user?.email;
  const { data, isSuccess, refetch } = useRegistrationState(email);

  // useNavigationBlocker(true);

  useEffect(() => {
    if (!email) {
      console.error("Email not provided to waiting screen.");
      return;
    }

    // Start the 3-second timer
    const timer = setTimeout(() => {
      // After 3 seconds, check registration status
      refetch().then(() => {
        if (isSuccess && data?.data?.isRegistrationComplete) {
          navigate("/signupfi", {
            state: {
              user: data.data,
            },
          },{replace:true});
        } else {
        
          console.log("Registration not complete yet");
        }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [email, isSuccess, data, navigate, refetch]);

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      {/* Navbar */}
      <nav className="w-full z-10">
        <div className="max-w-6xl py-4 px-6 flex justify-start">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center space-y-10">
        <div className="w-[85%] md:w-1/2 bg-blue-600 rounded-md h-10 flex items-center px-4 mt-5">
          <p className="text-sm text-white font-semibold whitespace-nowrap">
            Please hold on tight – while we are setting up your account...
          </p>
        </div>

        <div className="w-[80%] md:w-1/2 px-4">
          <img
            src={logo2}
            alt="Setup Illustration"
            className="w-[60%] h-auto object-contain mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F0F1F3] py-4 text-center text-xs text-gray-500">
        <p>
          © 2025 AskMeDirect, All rights reserved. •{" "}
          <a href="#" className="hover:underline text-sm">
            Terms of use
          </a>{" "}
          •{" "}
          <a href="#" className="hover:underline text-sm">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WaitingScreen;