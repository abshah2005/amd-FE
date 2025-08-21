import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import logo from "../assets/logo.svg";
import { useAuth } from "../contextProvider/AuthContextProvider";
import LinkedInIcon from "../icons/LinkedInIcon";
import EyeClose from "../icons/EyeClose";
import EyeOpen from "../icons/EyeOpen";
const SignInPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email.trim() && password.trim();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (!isFormValid) return;
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLinkedInSignIn = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/users/auth/linkedin`;
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white w-[80%] max-w-sm rounded-lg shadow-sm p-6 flex flex-col ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            Sign in
          </h2>
          <button
            onClick={handleLinkedInSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-[24px] flex items-center justify-center mb-6 transition"
          >
            <LinkedInIcon />
            Continue with LinkedIn
          </button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          <form className="space-y-3 w-full" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="john@askmedirect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <EyeOpen />
                  ) : (
                    <EyeClose />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Stay signed in
              </label>
              <a href="/forgotPassword" className=" text-sm">
                Forgot your{" "}
                <span className="text-blue-600  hover:text-blue-800 font-medium">
                  password?
                </span>
              </a>
            </div>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full font-medium py-2 px-4 rounded-[24px] transition ${
                isFormValid && !isLoading
                  ? "bg-[#086BFF] text-white  cursor-pointer"
                  : "bg-[#60718B] text-white cursor-not-allowed"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to AskMeDirect?{" "}
              <a
                href="/signup"
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                Join Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignInPage;
