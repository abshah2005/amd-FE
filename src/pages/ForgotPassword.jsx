import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useForgotPassword } from "../hooks/userhooks";
import { useNavigate } from "react-router-dom";
const verifiedEmail = import.meta.env.VITE_VERIFIED_EMAIL;


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPasswordMutation.mutateAsync(email);
      setSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[70%] max-w-md flex flex-col items-center">
          {!sent ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Reset your password?
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                Enter email associated with your account,<br />
                and we’ll send you a link to reset your password.
              </p>
              <form className="w-full" onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="john@askmedirect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                {error && (
                  <div className="mb-2 text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!email.trim() || forgotPasswordMutation.isPending}
                  className={`w-full py-2 rounded-[24px] font-medium transition ${
                    email.trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {forgotPasswordMutation.isPending ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Email Sent
              </h2>
              <p className="text-gray-700 text-center mb-4 text-base">
                A password reset email has been sent to <span className="font-semibold">{email}</span>. If you don’t see the email within a few minutes, check your email address, and your spam folder.
              </p>
              <p className="text-gray-500 text-center mb-6 text-sm">
                The email was sent from<br />
                <span className="font-semibold">{verifiedEmail}</span>
              </p>
              <button
                type="button"
                className="w-full py-2 rounded-[24px] font-medium bg-blue-600 text-white hover:bg-blue-700 transition mb-2"
                onClick={() => navigate("/signin")}
              >
                Return to Sign in
              </button>
            </>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className=" font-medium"
            onClick={() => navigate("/signin")}
          >
            Return to <span className="font-semibold text-blue-600  hover:text-blue-800">Sign in</span>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ForgotPassword;