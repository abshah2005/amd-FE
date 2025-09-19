import React, { useState } from "react";
import screenshot from "../assets/logo.svg";
import { useRegisterStep1 } from "../hooks/userhooks";
import { useNavigate } from "react-router-dom";
import PasswordStrengthChecker from "../components/PasswordChecker";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import LinkedInIcon from "../icons/LinkedInIcon";
import SignupForm from "../components/SignupForm";

const SignUpPage = () => {
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

          <SignupForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignUpPage;
