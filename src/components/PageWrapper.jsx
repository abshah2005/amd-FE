import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import logo from "../assets/logonew.svg";

const PageWrapper = ({ children }) => (
  <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
    <Navigation source={logo} />
    <div className="flex-1 flex flex-col">
      {children}
    </div>
    <Footer />
  </div>
);

export default PageWrapper;