import React from "react";

const Navigation = ({ source }) => {
  return (
    <nav className="bg-[#F0F1F3] py-4 px-6 flex-shrink-0 justify-start">
      <div className="max-w-6xl">
        <img src={source} className="w-28" alt="Logo" />
      </div>
    </nav>
  );
};

export default Navigation;