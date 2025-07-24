import React, { useState } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import dropdownIcon from "../assets/dropdown.svg";
import findIcon from "../assets/find.svg";
import userIcon from "../assets/user.svg";
import sendIcon from "../assets/send.svg";
import bellIcon from "../assets/bell.svg";
import Banner from "./Banner";

const MainNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuth();

  const userProfilePic = user?.profilePic || "https://your-cdn.com/user-profile.jpg";

  return (
    <div>
      <nav className="w-full bg-white px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center relative lg:left-10">
          <img src={logo} alt="AskMeDirect" className="w-24 lg:w-28" />
        </div>

        {/* Desktop Center Section */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center bg-[#F0F1F3] rounded-full px-4 py-2 w-[340px] max-w-md">
            <img src={findIcon} alt="Search" className="w-4 h-4 mr-2" />
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
              <img src={userIcon} alt="User" className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-6 relative lg:right-10">
          <img src={sendIcon} alt="Send" className="w-5 h-5" />
          <img src={bellIcon} alt="Bell" className="w-5 h-5" />
          {/* Profile: clickable avatar with dropdown */}
          <div
            className="flex items-center gap-2 group relative cursor-pointer"
            tabIndex={0}
            aria-label="Profile"
          >
            <img
              src={userProfilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover cursor-pointer transition-shadow group-hover:shadow-lg"
            />
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-40 z-50 hidden group-focus-within:block group-hover:block">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Section */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            className="bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="4" y="7" width="16" height="2" rx="1" fill="#fff" />
              <rect x="4" y="11" width="16" height="2" rx="1" fill="#fff" />
              <rect x="4" y="15" width="16" height="2" rx="1" fill="#fff" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end lg:hidden transition-all duration-300">
            <div className="bg-white w-full max-w-xs h-full shadow-xl p-0 flex flex-col animate-slidein relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowMobileMenu(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex flex-col items-center pt-10 pb-4 border-b border-gray-100">
                <img src={logo} alt="AskMeDirect" className="w-24 mb-2" />
                {/* Profile info */}
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={userProfilePic}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-blue-600 object-cover mb-2"
                  />
                  <span className="font-semibold text-gray-800 text-base">
                    {user?.firstName || "My Profile"}
                  </span>
                  <a
                    href="/profile"
                    className="text-blue-600 text-sm mt-1 hover:underline"
                  >
                    View Profile
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="text-gray-700 text-sm mt-2 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center bg-[#F0F1F3] rounded-full px-4 py-2 mb-4">
                  <img src={findIcon} alt="Search" className="w-4 h-4 mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none flex-1 text-sm"
                  />
                  <img
                    src={dropdownIcon}
                    alt="Dropdown"
                    className="w-4 h-4 ml-2"
                  />
                </div>
                <button className="w-full mb-4 bg-blue-600 rounded-full h-10 flex items-center justify-center">
                  Find a Professional
                </button>
                <div className="flex items-center gap-6 mb-4 h-[80vh] justify-center">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <img src={sendIcon} alt="Send" className="w-5 h-5" />
                  </div>
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <img src={bellIcon} alt="Bell" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Add slide-in animation */}
        <style>
          {`
            @keyframes slidein {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .animate-slidein {
              animation: slidein 0.3s cubic-bezier(.4,0,.2,1);
            }
          `}
        </style>
      </nav>
    </div>
  );
};

export default MainNav;
