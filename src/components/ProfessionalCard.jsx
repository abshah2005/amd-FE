import { Verified } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const ProfessionalCard = ({ professional }) => {
  return (
    <div className="bg-white h-60 shadow-md rounded-lg p-4">
      <div className="flex items-center">
        <img
          src={professional?.profilePic}
          alt={`${professional?.firstName} ${professional?.lastName}`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-lg font-semibold">
            {professional?.firstName} {professional?.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            {professional?.verified ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.73474 4.10536 5.48039 4.29289 5.29285C4.48043 5.10532 4.73478 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.4519 2.09896 11.7214 1.99951 12 1.99951C12.2786 1.99951 12.5481 2.09896 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.2652 4.99996 19.5196 5.10532 19.7071 5.29285C19.8946 5.48039 20 5.73474 20 5.99996V13Z"
                  stroke="#36B37E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#36B37E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              " "
            )}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          {professional?.about[0]?.slice(0, 30)}...
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {professional.rating} ★ ({professional?.ratingCount} reviews)
        </span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          <Link
            to={`/profile/${professional?.firstName}_${professional?.lastName}`}
          >
            View Profile
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
