import React, { useState } from "react";
import screenshot from "../assets/Screenshot 2025-07-16 154906.png";
import { useRegisterStep1 } from "../hooks/userhooks";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const registerStep1Mutation = useRegisterStep1();

  const hasMinLength = password.length >= 8;
  const hasNoSpaces = password.length > 0 && !/\s/.test(password);
  
  const getPasswordStrength = (pw) => {
    if (pw.length === 0) return { strength: 0, label: "" };
    if (!hasNoSpaces) return { strength: 1, label: "Weak" };

    let strength = 0;
    if (pw.length >= 8) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;
    if (/[^A-Za-z0-9]/.test(pw)) strength++;

    if (strength <= 2) return { strength: 1, label: "Weak" };
    if (strength === 3) return { strength: 2, label: "Medium" };
    return { strength: 3, label: "Strong" };
  };

  const { strength: pwStrength, label: pwStrengthLabel } = getPasswordStrength(password);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    if (!hasMinLength || !hasNoSpaces) {
      setError("Password doesn't meet requirements");
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerStep1Mutation.mutateAsync({
        email,
        password,
        authProvider: 'email'
      });
      
      if (result.data) {
        if (result.data.isRegistrationComplete) {
          navigate('/dashboard');
        } else {
          navigate('/onboard', { state: { email } });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInSignup = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would trigger LinkedIn OAuth flow
      // For now, we'll simulate it with the API call
      const result = await registerStep1Mutation.mutateAsync({
        email: email || `${Math.random().toString(36).substring(7)}@linkedin.com`, 
        password: '', 
        authProvider: 'linkedin'
      });
      
      if (result.data) {
        // Redirect to next step based on registration state
        if (result.data.isRegistrationComplete) {
          navigate('/dashboard');
        } else {
          navigate('/register/step2', { state: { email: result.data.email } });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "LinkedIn signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F0F1F3] flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="bg-[#F0F1F3] py-4 px-6 flex-shrink-0">
        <div className="max-w-6xl ">
          <img src={screenshot} className="w-28" alt="AskMeDirect Logo" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-6xl w-full flex">
            {/* Left Side Text */}
            <div className="hidden md:flex w-1/2 relative top-10 pr-10 flex-col ">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Connect → Ask → Get Answered
              </h1>
              <p className="text-gray-600 leading-relaxed">
                AskMeDirect connects you with trusted professionals for private,
                paid answers. Simply ask your question, set your price, and get
                expert insights — or receive a custom quote in return.
              </p>
            </div>

            {/* Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="bg-white w-full max-w-sm rounded-lg shadow-sm p-8 ">
                <button 
                  onClick={handleLinkedInSignup}
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center mb-6 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {isLoading ? 'Processing...' : 'Sign up with LinkedIn'}
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

                <form className="space-y-4" onSubmit={handleEmailSignup}>
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
                        onFocus={() => setPwFocus(true)}
                        onBlur={() => setPwFocus(false)}
                        autoComplete="new-password"
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
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5A10.05 10.05 0 0112 5c1.13 0 2.22.16 3.25.46M19.07 4.93l-14.14 14.14M9.88 9.88a3 3 0 104.24 4.24"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c-1.5 4-5.5 7-9 7s-7.5-3-9-7c1.5-4 5.5-7 9-7s7.5 3 9 7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    <div className="mt-3 flex items-center">
                      <div className="flex-1 flex">
                        <div
                          className={`h-1 flex-1 mr-1 rounded-l ${
                            pwStrength >= 1
                              ? pwStrengthLabel === "Weak"
                                ? "bg-red-500"
                                : "bg-gray-300"
                              : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`h-1 flex-1 mr-1 ${
                            pwStrength >= 2
                              ? pwStrengthLabel === "Medium"
                                ? "bg-yellow-400"
                                : "bg-gray-300"
                              : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`h-1 flex-1 rounded-r ${
                            pwStrength >= 3 ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                      {pwStrengthLabel && (
                        <span
                          className={`ml-2 text-xs font-medium ${
                            pwStrengthLabel === "Weak"
                              ? "text-red-500"
                              : pwStrengthLabel === "Medium"
                              ? "text-yellow-500"
                              : "text-green-600"
                          }`}
                        >
                          {pwStrengthLabel}
                        </span>
                      )}
                    </div>

                    {/* Requirements */}
                    <div className="mt-3 text-xs space-y-2">
                      <div className="flex items-start">
                        {hasMinLength ? (
                          <svg
                            className="w-4 h-4 mt-0.5 mr-2 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              fill="none"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mt-0.5 mr-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              fill="none"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span
                          className={
                            hasMinLength ? "text-green-600" : "text-gray-600"
                          }
                        >
                          Must have at least 8 characters
                        </span>
                      </div>
                      <div className="flex items-start">
                        {hasNoSpaces ? (
                          <svg
                            className="w-4 h-4 mt-0.5 mr-2 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              fill="none"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mt-0.5 mr-2 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.763-1.36 2.683-1.36 3.446 0l6.516 11.634c.75 1.34-.213 3.017-1.732 3.017H3.473c-1.52 0-2.482-1.677-1.732-3.017L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span
                          className={
                            hasNoSpaces ? "text-green-600" : "text-gray-600"
                          }
                        >
                          Must not contain spaces
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-6">
                    <p>
                      By clicking{" "}
                      <span className="font-semibold">Agree & Join</span>, you
                      agree to the AskMeDirect{" "}
                      <a
                        href="#"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        User Agreement
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition ${
                      (!hasMinLength || !hasNoSpaces || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={!hasMinLength || !hasNoSpaces || isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Agree & Join'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-600 underline hover:text-blue-800 font-medium"
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#F0F1F3] py-4 text-center text-xs text-gray-500 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <p>
            © 2025 AskMeDirect, All rights reserved. •{" "}
            <a href="#" className="hover:underline">
              Terms of use
            </a>{" "}
            •{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;