import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import PasswordStrengthChecker from "../components/PasswordChecker";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const hasMinLength = password.length >= 8;
  const hasNoSpaces = password.length > 0 && !/\s/.test(password);
  const isFormValid = hasMinLength && hasNoSpaces;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/users/resetPassword`, {
        token,
        newPassword: password,
      });
      navigate("/resetSuccess");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[85%] max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Reset your password
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Enter your new password. You will be logged out of<br />
            all your active sessions.
          </p>
          <form className="w-full" onSubmit={handleSubmit}>
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
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_192_642)">
                              <path
                                d="M7.15534 3.38404C8.70827 3.19898 10.2791 3.52725 11.6279 4.31874C12.9768 5.11023 14.0295 6.32142 14.6253 7.76737C14.6809 7.91705 14.6809 8.0817 14.6253 8.23137C14.3803 8.82537 14.0566 9.38371 13.6627 9.89137M9.38934 9.43871C9.01214 9.80302 8.50694 10.0046 7.98254 10.0001C7.45815 9.9955 6.95652 9.78516 6.58571 9.41435C6.21489 9.04353 6.00455 8.5419 6 8.01751C5.99544 7.49312 6.19703 6.98791 6.56134 6.61071M11.6527 11.666C10.7683 12.1899 9.78165 12.5174 8.75959 12.6263C7.73752 12.7352 6.70398 12.623 5.7291 12.2973C4.75422 11.9716 3.86081 11.44 3.10949 10.7385C2.35816 10.0371 1.76651 9.18228 1.37468 8.23204C1.31912 8.08236 1.31912 7.91772 1.37468 7.76804C1.96577 6.33461 3.00579 5.13154 4.33868 4.33937M1.33334 1.33337L14.6667 14.6667"
                                stroke="#4D5B70"
                                stroke-width="1.33"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_192_642">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
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
                  </div>
           
            <PasswordStrengthChecker password={password} />
            
            {error && (
              <div className="mb-2 text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={!hasMinLength || isLoading}
              className={`w-full py-2 relative top-3 rounded-[24px] font-medium transition ${
                hasMinLength && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResetPassword;