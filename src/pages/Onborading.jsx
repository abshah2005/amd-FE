import React, { useState } from "react";
import screenshot from "../assets/Screenshot 2025-07-16 154906.png";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useRegisterStep2 } from "../hooks/userhooks";
import question from "../assets/question.svg";
import person from "../assets/person.svg";

const OnboardingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [selectedRole, setSelectedRole] = useState("");
  const { mutate: registerStep2, isLoading } = useRegisterStep2();

  const handleSubmit = () => {
    if (!selectedRole || !email) return;

    registerStep2(
      { email, role: selectedRole },
      {
        onSuccess: () => {
          navigate(
            "/setup",
            {
              state: {
                email,
                role: selectedRole,
              },
            },
            { replace: true }
          );
        },
        onError: (error) => {
          console.error("Registration error:", error);
        },
      }
    );
  };

  

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col ">
      {/* Navbar */}
      <nav className="bg-[#F0F1F3] py-4 px-6 flex-shrink-0">
        <div className="max-w-6xl">
          <img src={screenshot} className="w-28" alt="AskMeDirect Logo" />
        </div>
      </nav>
      {/* Progress bar */}
      <div className="w-[80%] md:w-[50%] lg:[w-50%] sm:[w-50%] mb-2 mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex justify-center px-4 py-8 ">
        <div className="w-full  max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {/* Header */}
          <div className="w-full text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome aboard, <span className="underline">John!</span>
            </h1>
            <p className="text-gray-600 mt-4">
              Before we dive in, tell us how you'd like to use AskMeDirect.
              <br />
              We'll tailor everything just for you.
            </p>
          </div>

          {/* Options */}
          <div className="w-full flex flex-col  justify-around md:flex-row gap-6 mb-8">
            {/* Professional Option */}
            <div
              onClick={() => setSelectedRole("professional")}
              className={`relative bg-white p-6 rounded-xl shadow-sm border transition cursor-pointer group ${
                selectedRole === "professional"
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-blue-500"
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-3 right-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedRole === "professional"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedRole === "professional" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center ">
                <div className=" p-3 rounded-lg mr-4 group-hover:border-blue-500 transition">
                  <img src={person} className="" alt="" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    I'm a Professional
                  </h2>
                  <p className="text-gray-600">
                    I'm here to answer questions and help others.
                  </p>
                </div>
              </div>
            </div>

            {/* Asker Option */}
            <div
              onClick={() => setSelectedRole("asker")}
              className={`relative bg-white p-6 rounded-xl shadow-sm border transition cursor-pointer group ${
                selectedRole === "asker"
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-blue-500"
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-3 right-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedRole === "asker"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedRole === "asker" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center items-center">
                <div className="bg-white  p-3 rounded-lg mr-4 group-hover:border-blue-500 transition">
                  <img src={question} alt="" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    I'm an Asker
                  </h2>
                  <p className="text-gray-600">
                    I'm looking for answers and expert advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="w-full flex justify-center md:justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedRole || isLoading}
              className="w-full relative md:top-2 md:right-4  md:w-[20%] bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 md:px-4 md:py-2 rounded-[24px] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
