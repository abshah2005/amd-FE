import React from "react";
import leftPattern from "../assets/left.svg";
import rightPattern from "../assets/main.svg";
import starIcon from "../assets/center.svg";

const Banner = () => {
  return (
    <div className="w-full bg-[#0B74FF] flex items-center justify-between px-0 relative">
      {/* Left Pattern - responsive sizing */}
      <img
        src={leftPattern}
        alt="Left Pattern"
        className="w-auto ml-0 h-20 sm:h-18 md:h-auto"
        style={{ minWidth: "50px" }}
      />
      
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-4">
        <img
          src={starIcon}
          alt="Star"
          className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mb-2 sm:mb-2"
        />
        <span className="text-white text-sm xs:text-base sm:text-base md:text-lg font-normal text-center px-2 leading-relaxed">
          Find the right voice with the right experience.
        </span>
      </div>

      <img
        src={rightPattern}
        alt="Right Pattern"
        className="w-auto mr-0 h-20 sm:h-18 md:h-auto"
        style={{ minWidth: "50px" }}
      />
    </div>
  );
};

export default Banner;