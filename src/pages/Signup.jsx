import React, { useState } from "react";
import screenshot from "../assets/logo.svg";
import { useRegisterStep1 } from "../hooks/userhooks";
import { useNavigate } from "react-router-dom";
import PasswordStrengthChecker from "../components/PasswordChecker";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import LinkedInIcon from "../icons/LinkedInIcon";

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

  const { strength: pwStrength, label: pwStrengthLabel } =
    getPasswordStrength(password);

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
        authProvider: "email",
      });

      if (result.data) {
        if (result.data.isRegistrationComplete) {
          navigate("/dashboard");
        } else {
          navigate("/onboard", { state: { email } });
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInSignup = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/users/auth/linkedin`;
  };

  return (
  <PageWrapper>
    <div className="flex-1 flex flex-col justify-center items-center    ">
      <div className="max-w-6xl w-full mb-4  flex h-[83vh]">
        <div className="hidden md:flex w-1/2 relative top-10 pr-10 flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Connect → Ask → Get Answered
          </h1>
          <p className="text-gray-600 leading-relaxed">
            AskMeDirect connects you with trusted professionals for private,
            paid answers. Simply ask your question, set your price, and get
            expert insights — or receive a custom quote in return.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-2  rounded-lg">
          <div className="bg-white  w-[85%] max-w-sm rounded-2xl shadow-sm p-5">
            <button
              onClick={handleLinkedInSignup}
              disabled={isLoading}
              className={`
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                py-2
                px-4
                rounded-[24px]
                flex
                items-center
                justify-center
                mb-1
                transition
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              <LinkedInIcon />
              {isLoading ? "Processing..." : "Sign up with LinkedIn"}
            </button>
            <div className="relative mb-4 mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 text-sm rounded">
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
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_192_642)">
                          <path
                            d="M7.15534 3.38404C8.70827 3.19898 10.2791 3.52725 11.6279 4.31874C12.9768 5.11023 14.0295 6.32142 14.6253 7.76737C14.6809 7.91705 14.6809 8.0817 14.6253 8.23137C14.3803 8.82537 14.0566 9.38371 13.6627 9.89137M9.38934 9.43871C9.01214 9.80302 8.50694 10.0046 7.98254 10.0001C7.45815 9.9955 6.95652 9.78516 6.58571 9.41435C6.21489 9.04353 6.00455 8.5419 6 8.01751C5.99544 7.49312 6.19703 6.98791 6.56134 6.61071M11.6527 11.666C10.7683 12.1899 9.78165 12.5174 8.75959 12.6263C7.73752 12.7352 6.70398 12.623 5.7291 12.2973C4.75422 11.9716 3.86081 11.44 3.10949 10.7385C2.35816 10.0371 1.76651 9.18228 1.37468 8.23204C1.31912 8.08236 1.31912 7.91772 1.37468 7.76804C1.96577 6.33461 3.00579 5.13154 4.33868 4.33937M1.33334 1.33337L14.6667 14.6667"
                            stroke="#4D5B70"
                            strokeWidth="1.33"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                className={`
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-medium
                  py-2
                  px-4
                  
                  rounded-[24px]
                  transition
                  disabled:bg-[#60718B]
                  disabled:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),_0px_1px_3px_0px_rgba(0,0,0,0.06)]
                  disabled:cursor-not-allowed
                `}
                disabled={!hasMinLength || !hasNoSpaces || isLoading}
              >
                {isLoading ? "Processing..." : "Agree & Join"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/signin"
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
  </PageWrapper>
);

  
};

export default SignUpPage;
