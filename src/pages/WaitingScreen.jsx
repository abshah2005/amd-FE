import React, { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo2 from "../assets/icon.svg";
import { useRegistrationState } from "../hooks/userhooks";
import Navigation from "../components/Navigation";
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

    const timer = setTimeout(() => {
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