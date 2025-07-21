import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import successImg from "../assets/success.png";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="bg-[#F0F1F3]  flex flex-col justify-center items-center   max-h-screen h-[75vh] overflow-hidden">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[85%]  max-w-md flex flex-col items-center">
          <img src={successImg} alt="Success" className="w-24 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Your password has been reset!
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Sign in again with your new password
          </p>
          <button
            className="w-full py-2 rounded-[24px] font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => navigate("/signin")}
          >
            Return to Sign in
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PasswordResetSuccess;
