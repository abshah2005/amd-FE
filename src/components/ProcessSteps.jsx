import React from "react";

const ProcessSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Create your free profile",
      description:
        "Showcase your background, skills, and how you prefer to answer questions.",
    },
    {
      number: 2,
      title: "Share your profile link anywhere",
      description:
        "From lecture slides, newsletters, or social media — invite your own audience to connect with you directly.",
    },
    {
      number: 3,
      title: "Get discovered on the platform too",
      description:
        "Be visible to askers browsing categories, filters, and search.                                                                                                                                                                                                                 ",
    },
    {
      number: 4,
      title: "Receive and manage questions",
      description:
        "Choose which questions to answer, adjust delivery timelines, and stay in control.",
    },
    {
      number: 5,
      title: "Earn with transparency",
      description:
        "Every answered question = guaranteed payment. Platform fee is a flat 12% — no hidden costs.",
    },
    {
      number: 6,
      title: "Build your reputation & network",
      description:
        "Grow with ratings, reviews, and repeat askers who trust your answers.",
    },
  ];

  const benefits = [
    "Monetize your own audience",
    "Global exposure via marketplace",
    "Secure escrow and payouts",
    "Flat 12% platform fee (no hidden charges)",
  ];
  const fadeVariants = ["#D7EDFF", "#FEEAC7", "#EFE9FE", "#CFF7FE"];

  const TickSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_1122_8304)">
        <path
          d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.535 8.381C15.7145 8.19975 15.9566 8.09397 16.2115 8.08532C16.4665 8.07667 16.7152 8.1658 16.9066 8.33447C17.098 8.50313 17.2177 8.73858 17.2412 8.99262C17.2647 9.24666 17.1902 9.50008 17.033 9.701L16.95 9.795L11.364 15.382C11.1733 15.5726 10.9193 15.6866 10.6502 15.7023C10.381 15.7179 10.1155 15.6342 9.904 15.467L9.808 15.382L7.05 12.624C6.86875 12.4445 6.76297 12.2024 6.75432 11.9475C6.74567 11.6925 6.8348 11.4438 7.00347 11.2524C7.17213 11.061 7.40758 10.9413 7.66162 10.9178C7.91566 10.8943 8.16908 10.9688 8.37 11.126L8.464 11.21L10.586 13.331L15.536 8.381H15.535Z"
          fill="#36B37E"
        />
      </g>
      <defs>
        <clipPath id="clip0_1122_8304">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const ArrowSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="55"
      viewBox="0 0 16 69"
      fill="none"
    >
      <path
        d="M7.29289 68.7071C7.68342 69.0976 8.31658 69.0976 8.70711 68.7071L15.0711 62.3431C15.4616 61.9526 15.4616 61.3195 15.0711 60.9289C14.6805 60.5384 14.0474 60.5384 13.6569 60.9289L8 66.5858L2.34315 60.9289C1.95262 60.5384 1.31946 60.5384 0.928932 60.9289C0.538408 61.3195 0.538408 61.9526 0.928932 62.3431L7.29289 68.7071ZM8 0L7 0L7 68H8H9L9 0L8 0Z"
        fill="#C7CBD1"
      />
    </svg>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative ">
            <div className="flex mb-1">
              {/* Number Circle */}
              <div className={`mr-4 flex-shrink-0 mt-1  `}>
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-600 text-sm font-medium border border-blue-200">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className={`  flex-grow`}>
                <h3 className="text-lg font-bold text-blue-600 mb-0.5">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            </div>

            {/* Arrow between steps (except after last step) */}
            {index < steps.length - 1 && (
              <div className={`absolute left-1 top-8 h-16 -ml-0.5`}>
                <ArrowSvg />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Benefits Checkmarks at bottom */}
      <div className="mt-6  p-4  rounded-lg ">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`inline-flex   bg-[${fadeVariants[index]}] items-center mb-2 last:mb-0 rounded-lg p-2`}
          >
            <div
              className={`w-6  h-6 rounded-full  flex items-center justify-center mr-2`}
            >
              <TickSvg />
            </div>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
