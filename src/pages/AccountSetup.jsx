import React, { useState } from "react";
import logo from "../assets/Screenshot 2025-07-16 154906.png";

const AccountSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full z-10">
        <div className="max-w-6xl py-4 px-6 flex justify-start">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="w-[80%] md:w-[50%] lg:[w-50%] sm:[w-50%] bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: "100%" }}
        ></div>
      </div>
      <div className="p-5 md:p-0">
<div className="w-full justify-center items-center p-6 flex flex-col max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-10 mt-8 mb-12">
        
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set up your account
          </h1>
          <p className="text-gray-600">
            Your name and profile image will be visible to the professional when
            you submit your question.
          </p>
        </div>

        <div className="flex flex-col flex-col-reverse justify-around w-[80%] items-center  md:flex-row">
        
          <div>
            <div className="flex  justify-center  mb-8">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  "J"
                )}
              </div>
            </div>
            <div className="flex justify-center mb-8">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition"
              >
                {/* Upload Icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>Upload</span>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Name Input */}
          <div className="flex flex-col w-[100%] md:w-[60%] items-center justify-center border border-rounded rounded-md border-gray p-10 gap-4 mb-8 ">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-200 rounded-md shadow-sm"
                placeholder="John"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium  text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-200 rounded-md shadow-sm"
                placeholder="Cena"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center ">
          <button className="text-blue-600 text-sm">Back</button>
          <button
            className={`${
              !firstName || !lastName
                ? "opacity-50 cursor-not-allowed"
                : "bg-blue-600 text-white"
            } py-3 px-6 rounded-lg text-sm`}
            disabled={!firstName || !lastName}
          >
            Next
          </button>
        </div>
      </div>
        
      </div>
      {/* Main Content */}
      

      {/* Footer */}
      <footer className="bg-[#F0F1F3] py-4 text-center text-xs text-gray-500 mt-12">
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

export default AccountSetup;
