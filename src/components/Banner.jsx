import React from "react";
import leftPattern from "../assets/left.svg";
import rightPattern from "../assets/main.svg";
import starIcon from "../assets/center.svg";

const Banner = () => {
  return (
    <div className="w-full bg-[#0B74FF] flex items-center justify-between py-0 px-0 relative">
      <img
        src={leftPattern}
        alt="Left Pattern"
        className=" w-auto ml-0 bg- "
        // style={{ minWidth: 70 }}
      />

      <div className="flex flex-col items-center justify-center flex-1">
        <img src={starIcon} alt="Star" className="w-8 h-8 mb-2" />
        <span className="text-white text-base font-normal">
          Find the right voice with the right experience.
        </span>
      </div>

      <img
        src={rightPattern}
        alt="Right Pattern"
        className=" w-auto mr-0"
        style={{ minWidth: 80 }}
      />
    </div>
  );
};

export default Banner;