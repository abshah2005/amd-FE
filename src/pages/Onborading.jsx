import React, { useState } from "react";
import screenshot from "../assets/Screenshot 2025-07-16 154906.png";

const OnboardingScreen = () => {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
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
      <div className="flex-1 w-full flex justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
          
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
          <div className="w-full flex flex-col md:flex-row gap-6 mb-8">
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

              {/* Content */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
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
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
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
          <div className="w-full flex justify-center">
            <button
              disabled={!selectedRole}
              className={`w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition ${
                !selectedRole ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
