import React from "react";

const LandingHeader = () => {
  return (
    <div className="flex flex-col items-center text-center bg-gray-100 py-12 px-4 lg:px-16">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Knowledge doesn’t end at the lecture, call, or meeting
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-3xl mb-6">
        Keep the conversation going—share your profile, answer questions, and
        grow your impact.
      </p>
      <div className="flex gap-4 ">
        <button className="bg-[#086BFF] text-white px-6 py-3 rounded-full hover:bg-blue-700">
          Get Started
        </button>
        <button className="border rounded-full border-blue-600 text-blue-600 px-6 py-3  hover:bg-blue-100">
          How it works
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;
