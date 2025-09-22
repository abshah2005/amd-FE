import React from "react";
import logo from "../assets/logonew.svg";

const AppSkeleton = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F1F3]">
    <div className="flex flex-col items-center gap-6 w-full max-w-lg px-6">
      <div className="text-6xl animate-wave">
        <div className="flex items-center relative lg:left-10">
          <a href="/">
            <img src={logo} alt="AskMeDirect" className="w-24 lg:w-28" />
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-3/4" />
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/2" />
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-2/3" />
      </div>
      <div className="text-gray-400 text-lg mt-6">Loading, please wait...</div>
    </div>
    <style>
      {`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 1.5s infinite;
          transform-origin: 70% 70%;
        }
      `}
    </style>
  </div>
);

export default AppSkeleton;
