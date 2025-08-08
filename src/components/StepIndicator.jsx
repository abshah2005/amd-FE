import React from "react";

const steps = [
  {
    label: "Personal Information",
    description:
      "Tell us a bit about yourself. This information helps askers better understand who you are and builds confidence in your expertise.",
  },
  {
    label: "Professional Details",
    description:
      "Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you’re the right fit.",
  },
  {
    label: "Payment Setup",
    description:
      "Secure your earnings. Add your payment details to receive payouts for every accepted answer.",
  },
];

const StepIndicator = ({
  currentStep,
  completedSteps,
  onStepClick,
  userName = "Alex",
  onContinue,
  continueDisabled = true,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">
      Hey {userName}, Ready to share your knowledge with others?
    </h2>
    <div className="bg-white rounded-2xl border p-6 w-full max-w-sm">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex flex-col">
          <div className="flex items-start gap-3 py-2">
            <input
              type="checkbox"
              checked={completedSteps > idx}
              readOnly
              tabIndex={-1}
              className="accent-blue-600 mt-1 cursor-default"
            />
            <div>
              <span
                className={`block font-medium ${
                  idx === currentStep
                    ? "text-blue-600 "
                    : "text-gray-700"
                }`}
              >
                {step.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1 font-normal">
                {step.description}
              </span>
            </div>
          </div>
          {idx < steps.length - 1 && <hr className="my-1 border-gray-200" />}
        </div>
      ))}
     
    </div>
     <button
        className="w-[50%] mt-6 bg-gray-200 text-gray-500 font-semibold py-2 rounded-full cursor-not-allowed text-sm"
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
      >
        Save & Continue
      </button>
  </div>
);

export default StepIndicator;