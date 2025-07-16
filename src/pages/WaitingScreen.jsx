import React from "react";
import logo from "../assets/Screenshot 2025-07-16 154906.png";
import logo2 from "../assets/waiting.png";

const WaitingScreen = () => {
  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      {/* Navbar */}
      <nav className="w-full z-10">
        <div className="max-w-6xl py-4 px-6 flex justify-start">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </nav>

      {/* Main Content - Grows to fill space */}
      <div className="flex-1 flex flex-col items-center space-y-10">
        {/* Info Bar */}
        <div className="w-[85%] md:w-1/2 bg-blue-600 rounded-md h-10 flex items-center px-4 mt-5">
          <p className="text-sm text-white font-semibold ttext-left whitespace-nowrap">
            Please hold on tight – while we are setting up your account...
          </p>
        </div>

        {/* Responsive Image */}
        <div className="w-[80%] md:w-1/2 px-4">
          <img
            src={logo2}
            alt="Setup Illustration"
            className="w-[60%] h-auto object-contain mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F0F1F3] py-4 text-center text-xs text-gray-500">
        <p>
          © 2025 AskMeDirect, All rights reserved. •{" "}
          <a href="#" className="hover:underline text-sm">
            Terms of use
          </a>{" "}
          •{" "}
          <a href="#" className="hover:underline text-sm">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WaitingScreen;
