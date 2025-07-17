import React from "react";

const getPasswordStrength = (password) => {
  const hasNoSpaces = password.length > 0 && !/\s/.test(password);
  if (password.length === 0) return { strength: 0, label: "" };
  if (!hasNoSpaces) return { strength: 1, label: "Weak" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { strength: 1, label: "Weak" };
  if (strength === 3) return { strength: 2, label: "Medium" };
  return { strength: 3, label: "Strong" };
};

const PasswordStrengthChecker = ({ password }) => {
  const hasMinLength = password.length >= 8;
  const hasNoSpaces = password.length > 0 && !/\s/.test(password);
  const { strength: pwStrength, label: pwStrengthLabel } = getPasswordStrength(password);

  return (
    <div className="mt-3">
      {/* Bars */}
      <div className="flex items-center mb-4">
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
      <div className="text-xs space-y-2">
        <div className="flex items-start">
          <CheckItem valid={hasMinLength} text="Must have at least 8 characters" />
        </div>
        <div className="flex items-start">
          <CheckItem valid={hasNoSpaces} text="Must not contain spaces" />
        </div>
      </div>
    </div>
  );
};

const CheckItem = ({ valid, text }) => (
  <>
    {valid ? (
      <svg
        className="w-4 h-4 mt-0.5 mr-2 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 mt-0.5 mr-2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
    <span className={valid ? "text-green-600" : "text-gray-600"}>{text}</span>
  </>
);

export default PasswordStrengthChecker;
