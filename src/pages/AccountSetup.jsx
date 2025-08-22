import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterStep3 } from "../hooks/userhooks";
import WaitingScreen from "./WaitingScreen";

import logo from "../assets/Screenshot 2025-07-16 154906.png";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

const AccountSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, role } = location.state || {};
  const [showWaiting, setShowWaiting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { mutate: registerStep3, isPending } = useRegisterStep3();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (profileImageFile) {
      formData.append("profilePic", profileImageFile);
    }

    registerStep3(formData, {
      onSuccess: (data) => {
        console.log("Navigation data:", data);
        navigate("/waiting", {
          state: {
            email: data.data.user.email,
            user: data.data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        });
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const initial = firstName ? firstName.charAt(0).toUpperCase() : "";

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col items-center">
      <nav className="w-full z-10">
        <div className="max-w-6xl py-4 px-6 flex justify-start">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </nav>

      <div className="w-[80%] md:w-[50%] lg:[w-50%] sm:[w-50%] bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: "100%" }}
        ></div>
      </div>

      <div className="p-5 md:p-0 w-full flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-10 mt-8 mb-12">
          <div className="w-full text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Set up your account
            </h1>
            <p className="text-gray-600">
              Your name and profile image will be visible to the professional
              when you submit your question.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-around w-full items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "J"
                  )}
                </div>
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition"
                  required
                >
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

              {/* Name Input */}
              <div className="flex flex-col w-full md:w-[60%] gap-4 p-6 border border-gray-200 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!firstName || !lastName || isPending}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  !firstName || !lastName || isPending
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isPending ? "Processing..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountSetup;
