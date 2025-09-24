import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileView from "../components/ProfileView";
import PaymentsView from "../components/PaymentsView";
import { useAuth } from "../contextProvider/AuthContextProvider";

const AccountSettings = () => {
  const [tab, setTab] = useState("profile");
  const navigate = useNavigate();
  const { user, refreshCurrentUser } = useAuth();

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between px-8 py-4  bg-white rounded-2xl">
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <button
            aria-label="Close settings"
            onClick={() => navigate(-1)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white w-full  shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100">
          <Sidebar tab={tab} onChange={setTab} showPayments={true} user={user} />
          <div className="flex-1 relative">
            <div className="p-8 h-[70vh] overflow-auto">
              <div className="max-w-[980px] mx-auto">
                {tab === "profile" ? <ProfileView  /> : <PaymentsView user={user} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
