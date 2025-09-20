import React from "react";
import mapImage from "../assets/worldMap2.png"; // Replace with the actual path to your map image
import { Link } from "react-router-dom";

const MapComponent = () => {
  return (
    <div className="bg-[#FEEAC7] py-12 px-3 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="max-w-lg mb-8   lg:mb-0">
        <h2 className="text-3xl font-bold mb-2">1. Global Reach</h2>
        <p className="text-gray-700 mb-3">
          Connect with professionals and askers worldwide — no borders, just access.
        </p>

        <h2 className="text-3xl font-bold mb-2">2. Fair & Transparent Payments</h2>
        <p className="text-gray-700 mb-3">
          Only pay once your question is accepted. Simple, secure, and built on trust.
        </p>

        <h2 className="text-3xl font-bold mb-2">3. Beyond Freelance Gigs</h2>
        <p className="text-gray-700 mb-3">
          More than a marketplace — professionals can share profile links with their own audiences to monetize knowledge directly.
        </p>

        <button className="border rounded-full border-blue-600 text-blue-600 px-6 py-3  hover:bg-blue-100">
          <Link to={"/signup"} className="cursor-pointer hover:text-blue-600">
          Get Started
          </Link>
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={mapImage} alt="World Map" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default MapComponent;