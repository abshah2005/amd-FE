import React from "react";
import logo from "../assets/logo.svg";
import logo2 from "../assets/icon.svg";

const SignupFi = () => {
  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      {/* Navbar */}
      <nav className="w-full z-10">
        <div className="max-w-6xl py-4 px-6 flex justify-start">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </nav>

      {/* Main Content - Grows to fill space */}
      <div className="w-full  flex flex-col mt-10  items-center bg-[#F0F1F3] text-center px-4">
        {/* Logo */}
        <img src={logo2} alt="AskMeDirect Logo" className="w-16 h-16 mb-6" />

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Welcome! Your account set up is completed.{" "}
          <span role="img" aria-label="party">
            👏
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-gray-700 max-w-xl mb-6">
          You’re ready to start asking smarter. Whether you need advice,
          clarity, or a second opinion — AskMeDirect connects you with trusted
          professionals who’ve been there.
          <br />
          Write your question, set your price, and get thoughtful, private
          answers — or receive a custom quote. It’s that easy.
        </p>

        {/* Call to Action */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm sm:text-base hover:bg-blue-700 transition">
          Start asking questions
        </button>
      </div>
    </div>
  );
};

export default SignupFi;
