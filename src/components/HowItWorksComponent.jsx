import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stockImg from "../assets/stockimg.png";
import stockImg2 from "../assets/stockimg2.png";
import DivisionComponent from "./DivisionComponent";

const AskMeDirectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <g clipPath="url(#clip0_1161_7749)">
      <mask
        id="mask0_1161_7749"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <path d="M40 0H0V40H40V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1161_7749)">
        <path
          d="M20 40C18.6806 40 17.4653 39.6702 16.3542 39.0104C15.2778 38.3854 14.4097 37.5348 13.75 36.4584C13.125 35.3472 12.8125 34.132 12.8125 32.8124C12.8125 31.1458 13.1944 29.757 13.9583 28.6458C14.7222 27.5348 15.9028 26.2326 17.5 24.7396C18.6806 23.6632 19.2708 22.6388 19.2708 21.6666V20.7292H18.3333C17.2569 20.7292 15.7812 21.8056 13.9062 23.9584C12.066 26.1112 9.82638 27.1874 7.1875 27.1874C5.86806 27.1874 4.65278 26.875 3.54166 26.25C2.46528 25.5902 1.59722 24.7222 0.9375 23.6458C0.3125 22.5348 0 21.3194 0 20C0 18.6806 0.3125 17.4826 0.9375 16.4062C1.59722 15.2951 2.46528 14.4271 3.54166 13.8021C4.65278 13.1424 5.86806 12.8125 7.1875 12.8125C9.79166 12.8125 12.0139 13.8715 13.8542 15.9896C15.6944 18.1076 17.1875 19.1667 18.3333 19.1667H19.2708V18.3333C19.2708 17.3611 18.6806 16.3368 17.5 15.2604L16.3021 14.1667C15.434 13.3681 14.6354 12.4132 13.9062 11.3021C13.1771 10.1562 12.8125 8.78472 12.8125 7.1875C12.8125 5.86806 13.125 4.67014 13.75 3.59376C14.4097 2.48264 15.2778 1.61458 16.3542 0.989582C17.4653 0.32986 18.6806 0 20 0C21.3194 0 22.5174 0.32986 23.5938 0.989582C24.7048 1.6493 25.573 2.51736 26.198 3.59376C26.8576 4.67014 27.1874 5.86806 27.1874 7.1875C27.1874 9.79166 26.1284 12.0139 24.0104 13.8542C21.8924 15.6944 20.8334 17.1875 20.8334 18.3333V19.1667H21.6666C22.8472 19.1667 24.3402 18.1076 26.1458 15.9896C27.9166 13.8715 30.1388 12.8125 32.8126 12.8125C34.132 12.8125 35.3298 13.1424 36.4062 13.8021C37.5174 14.4271 38.3854 15.2778 39.0104 16.3542C39.6702 17.4306 40 18.6458 40 20C40 21.3194 39.6702 22.5348 39.0104 23.6458C38.3854 24.7222 37.5174 25.5902 36.4062 26.25C35.3298 26.875 34.132 27.1874 32.8126 27.1874C31.1806 27.1874 29.7744 26.7882 28.5938 25.9896C27.448 25.191 26.1632 24.0278 24.7396 22.5C23.6632 21.3194 22.6388 20.7292 21.6666 20.7292H20.8334V21.6666C20.8334 22.9514 21.8924 24.4444 24.0104 26.1458C26.1284 27.8472 27.1874 30.0694 27.1874 32.8124C27.1874 34.132 26.8576 35.3472 26.198 36.4584C25.573 37.5348 24.7222 38.3854 23.6458 39.0104C22.5694 39.6702 21.3542 40 20 40Z"
          fill="#F59E0B"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1161_7749">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ToggleSwitch = ({ isProfessional, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-sm ${
          isProfessional ? "font-medium text-gray-900" : "text-gray-500"
        }`}
      >
        Professional Flow
      </span>
      <label className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={!isProfessional}
          onChange={onChange}
        />
        <span
          className={`absolute cursor-pointer inset-0 rounded-full transition-colors duration-300 ${
            isProfessional ? "bg-[#3B82F6]" : "bg-[#F59E0B]"
          }`}
        >
          <span
            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${
              isProfessional ? "left-0.5" : "left-[calc(100%-1.25rem)]"
            }`}
          />
        </span>
      </label>
      <span
        className={`text-sm ${
          !isProfessional ? "font-medium text-gray-900" : "text-gray-500"
        }`}
      >
        Asker Flow
      </span>
    </div>
  );
};

const StepItem = ({
  number,
  title,
  description,
  isSelected,
  isProfessional,
  img,
}) => (
  <div
    className={`flex flex-col items-center max-w-[140px] transition-all duration-300 ${
      isSelected ? "transform scale-105" : ""
    }`}
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors ${
        isSelected
          ? isProfessional
            ? "bg-blue-200 text-blue-700"
            : "bg-amber-200 text-amber-700"
          : "bg-blue-100 text-gray-700"
      }`}
    >
      {number}
    </div>
    <h4
      className={`text-sm font-medium mb-1.5 text-center ${
        isSelected ? "text-gray-900" : "text-gray-700"
      }`}
    >
      {title}
    </h4>
    <p
      className={`text-xs text-gray-600 text-start leading-tight ${
        isSelected ? "font-medium" : ""
      }`}
    >
      {description}
    </p>
    {/* <img src={img} alt="" /> */}
  </div>
);

// Professional flow steps with visual elements
const ProfessionalFlowContent = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Get notified",
      description: "Receive notifications when a new question is sent to you.",
    },
    {
      number: 2,
      title: "Review & decide",
      description:
        "Open the question, check details, and choose to accept or reject.",
    },
    {
      number: 3,
      title: "Set terms",
      description: "If accepting, propose your delivery time and fee.",
    },
    {
      number: 4,
      title: "Wait for confirmation",
      description:
        "The asker reviews your terms and accepts before payment is secured.",
    },
    {
      number: 5,
      title: "Provide your answer",
      description: "Deliver the response within the agreed time.",
    },
    {
      number: 6,
      title: "Earn & grow",
      description:
        "Payment is released automatically, minus the 12% platform fee. Build reputation through ratings and reviews.",
    },
  ];

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-700 mb-8 max-w-3xl"
      >
        Create your profile and share it anywhere to invite your own audience.
        Get discovered through categories and search on the platform. Receive
        questions, set delivery timelines and pricing, and stay in control.
        Every successfully answered question means guaranteed payment. Ratings
        and reviews then help you build your reputation and grow your network.
      </motion.p>

      <div className="flex flex-wrap justify-between gap-y-8 mb-10">
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            isSelected={step.number === selectedStep}
            isProfessional={true}
            img={stockImg}
          />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex relative right-2 border rounded-full p-1 w-fit float-right">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleStepClick(num)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-all duration-300 ${
                num === selectedStep
                  ? "bg-blue-100 text-blue-600 border-blue-300 transform scale-110 shadow-sm"
                  : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-blue-50"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <img className="p-5" src={stockImg2} alt="" />
    </>
  );
};

// Asker flow steps
const AskerFlowContent = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Find your expert",
      description:
        "Browse categories or use filters to match with the right professional.",
    },
    {
      number: 2,
      title: "Ask your question",
      description:
        "Submit your question in text or with images, and set your preferred delivery time.",
    },
    {
      number: 3,
      title: "Get confirmation",
      description:
        "The professional can accept your request or suggest a different delivery time. You only pay once they accept.",
    },
    {
      number: 4,
      title: "Receive your answer",
      description:
        "Get a clear, personalized response from your expert—delivered on schedule.",
    },
    {
      number: 5,
      title: "Share feedback",
      description:
        "Close the session by rating your experience and giving feedback.",
    },
  ];

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-gray-700 mb-8 max-w-3xl"
      >
        Browse categories or apply filters to find the right professional. Ask
        your question in text or with images, set your preferred delivery time,
        and the expert will confirm or suggest an alternative. Once accepted,
        you pay securely and get a clear, personalized answer—right on time.
      </motion.p>

      {/* <div className="flex flex-wrap justify-between gap-y-8 mb-10">
        {steps.map((step) => (
          <StepItem 
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div> */}
      <div className="flex flex-wrap justify-between gap-y-8 mb-10">
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            isSelected={step.number === selectedStep}
            isProfessional={false}
            img={stockImg}
          />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex relative right-2 border rounded-full p-1 w-fit float-right">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleStepClick(num)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-all duration-300 ${
                num === selectedStep
                  ? "bg-amber-50 text-amber-600 border-amber-300 transform scale-110 shadow-sm"
                  : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-amber-50"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <img className="p-5" src={stockImg} alt="" />
    </>
  );
};

const HowItWorksComponent = () => {
  const [isProfessional, setIsProfessional] = useState(true);

  const handleToggle = () => {
    setIsProfessional(!isProfessional);
  };

  return (
    <div className=" w-[80%]  mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="pb-2 flex-shrink-0">
          <AskMeDirectIcon />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              How does AskMeDirect work?
            </h2>
            <ToggleSwitch
              isProfessional={isProfessional}
              onChange={handleToggle}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isProfessional ? (
            <motion.div
              key="professional"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfessionalFlowContent />
            </motion.div>
          ) : (
            <motion.div
              key="asker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AskerFlowContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HowItWorksComponent;
