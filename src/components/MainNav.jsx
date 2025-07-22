import React from "react";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import dropdownIcon from "../assets/dropdown.svg";
import findIcon from "../assets/find.svg";
import userIcon from "../assets/user.svg";
import sendIcon from "../assets/send.svg";
import bellIcon from "../assets/bell.svg";

const MainNav = () => {
  return (
    <nav className="w-full bg-white px-8 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center relative left-10">
        <img src={logo} alt="AskMeDirect" className=" w-28" />
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-[#F0F1F3] rounded-full px-4 py-2 w-[340px] max-w-md">
          <img src={findIcon} alt="Search" className="w-4  h-4 mr-2" />
          
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none flex-1 text-sm"
          />
          <img src={dropdownIcon} alt="Dropdown" className="w-4 h-4 ml-2" />
        </div>
        <button className="ml-4 bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center">
          <img src={searchIcon} alt="Search" className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-between space-between">
            <span className="pl-2 pr-2 bold">|</span>
          <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline">
           Find a Professional
          </button>
          <div className="flex items-center pl-2">
            <img src={userIcon} alt="User" className="w-6 h-6 " />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative right-10">
        <img src={sendIcon} alt="Send" className="w-5 h-5" />
        <img src={bellIcon} alt="Bell" className="w-5 h-5" />

        <div className="bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center text-white font-bold text-lg">
          J
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
