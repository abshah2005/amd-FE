import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contextProvider/AuthContextProvider";
import { useToggleActiveRole, useRegisterStep2 } from "../hooks/userhooks";
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import dropdownIcon from "../assets/dropdown.svg";
import findIcon from "../assets/find.svg";
import userIcon from "../assets/user.svg";
import sendIcon from "../assets/send.svg";
import bellIcon from "../assets/bell.svg";
import Banner from "./Banner";
import Setting from "../icons/Setting";
import Logout from "../icons/Logout";
import MessageLogo from "../icons/MessageLogo";
import ActiveMessageIcon from "../icons/ActiveMessageIcon";

function RoleSwitchOverlay({ show }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        show
          ? "backdrop-blur-sm bg-black/20 opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.3s" }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mb-4" />
        <span className="text-white text-lg font-semibold">
          Switching role…
        </span>
      </div>
    </div>
  );
}

const MainNav = ({ isDashboard }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, logout, refreshCurrentUser } = useAuth();
  const { mutateAsync: toggleActiveRole, isPending: isLoading } = useToggleActiveRole();
  const { mutateAsync: registerStep2 } = useRegisterStep2();
  const navigate = useNavigate();

  // <-- new: use location to determine active route (no extra state)
  const location = useLocation();
  const isQuestionsActive = location.pathname.startsWith("/questions");

  const canToggleRole =
    Array.isArray(user?.roles) &&
    (
      (user?.roles.includes("professional") && user?.roles.includes("asker")) ||
      (user?.roles.length === 1 && user?.roles[0] === "asker")
    );

  const switchLabel =
    user?.activeRole === "professional"
      ? "Switch to Asker"
      : "Switch to Professional";

  const modalRef = useRef(null);

  const userProfilePic =
    user?.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/028/569/170/small_2x/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg";
  const displayName = user?.fullName;
  const email = user?.email;

  useEffect(() => {
    function handleOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target))
        setShowProfileModal(false);
    }
    function handleEsc(e) {
      if (e.key === "Escape") setShowProfileModal(false);
    }
    if (showProfileModal) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showProfileModal]);

  return (
    <div>
      {console.log("isLoading",isLoading)}
      <RoleSwitchOverlay show={isLoading} />
      <nav className="w-full bg-white px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center relative lg:left-10">
          <Link to="/">
            <img src={logo} alt="AskMeDirect" className="w-24 lg:w-28" />
          </Link>
        </div>

        {/* Desktop Center Section */}

        {user?.activeRole === "asker" && (
          <div className="hidden lg:flex flex-1 justify-center gap-2">
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
              <div className="w-[1px] h-6 bg-black mx-2"></div>
              <button className="flex items-center gap-1 text-blue-600 font-medium text-sm ">
                Find a Professional
              </button>
              <div className="flex items-center pl-4">
                <img src={userIcon} alt="User" className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-6 relative lg:right-10">
          {!user?.isAdmin && (
            <Link
              to="/questions"
              aria-current={isQuestionsActive ? "page" : undefined}
              className={`rounded-full p-1 flex items-center justify-center transition`}
            >
              {isQuestionsActive ? <ActiveMessageIcon /> : <MessageLogo />}
            </Link>
          )}
          <img src={bellIcon} alt="Bell" className="w-5 h-5" />

          {/* Profile: clickable avatar opens modal-style card */}
          <div className="relative">
            <button
              onClick={() => setShowProfileModal((s) => !s)}
              aria-expanded={showProfileModal}
              aria-label="Open profile"
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <img
                src={userProfilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover cursor-pointer transition-shadow hover:shadow-lg"
              />
            </button>

            {showProfileModal && (
              <div
                ref={modalRef}
                className="absolute  right-5 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 ring-1 ring-black ring-opacity-5"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {user?.firstName ? user.firstName[0] : "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {displayName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {email}
                      </div>
                    </div>
                  </div>

                  {canToggleRole && (
                    <div className="mt-4">
                      <button
                        onClick={async () => {
                          try {
                            const target =
                              user?.activeRole === "professional"
                                ? "asker"
                                : "professional";
                            // If user only has "asker" role and wants to switch to professional
                            if (
                              Array.isArray(user?.roles) &&
                              user?.roles.length === 1 &&
                              user?.roles[0] === "asker" &&
                              target === "professional"
                            ) {
                              // Use hook to add professional role
                              await registerStep2({ email: user.email, role: "professional" });
                              if (typeof refreshCurrentUser === "function") {
                                await refreshCurrentUser();
                              }
                              // Use react-router navigation
                              navigate("/pofon", { state: { user } });
                              return;
                            }
                            await toggleActiveRole(target);
                            setShowProfileModal(false);
                          } catch (err) {
                            console.error("Role toggle failed", err);
                          }
                        }}
                        disabled={isLoading}
                        className={`w-full ${
                          isLoading
                            ? "opacity-60 cursor-wait"
                            : "bg-white border border-blue-200"
                        } text-blue-600 rounded-full py-2 text-sm font-medium`}
                      >
                        {isLoading ? "Switching..." : switchLabel}
                      </button>
                    </div>
                  )}
                </div>

                {/* divider */}
                <div className="border-t border-gray-200" />

                {/* actions */}
                <div className="p-2">
                  <Link
                    to={"/account-settings"}
                    className="flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-50 text-gray-800 text-sm"
                  >
                    <span className="w-6 h-6 flex items-center justify-center text-gray-700">
                      <Setting />
                    </span>
                    <span className="font-medium">Account Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileModal(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-3 mt-1 rounded hover:bg-gray-50 text-gray-800 text-sm"
                    type="button"
                  >
                    <span className="w-6 h-6 flex items-center justify-center text-gray-700">
                      <Logout />
                    </span>
                    <span className="font-medium">Log out</span>
                  </button>
                </div>
              </div>
            )}
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
                  <Link
                    to="/questions"
                    className={`rounded-full w-10 h-10 flex items-center justify-center transition ${
                      isQuestionsActive ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    {isQuestionsActive ? (
                      <ActiveMessageIcon />
                    ) : (
                      <MessageLogo />
                    )}
                  </Link>
                  <div
                    className={`rounded-full w-10 h-10 flex items-center justify-center ${
                      isQuestionsActive ? "" : "bg-gray-100"
                    }`}
                  >
                    <img src={bellIcon} alt="Bell" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
