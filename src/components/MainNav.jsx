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
import useProfessionals from "../hooks/useProfessionals";
import ProfessionalCard from "./ProfessionalCard";

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

const MainNav = ({ tailwindclass = "bg-white border-b border-gray-200" }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, logout, refreshCurrentUser } = useAuth();
  const { mutateAsync: toggleActiveRole, isPending: isLoading } =
    useToggleActiveRole();
  const { mutateAsync: registerStep2 } = useRegisterStep2();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [page, setPage] = useState(1); // State for pagination
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const { data, isPending, fetchNextPage } = useProfessionals(
    searchQuery.trim() ? { name: searchQuery, page, limit: 5 } : null,
    { keepPreviousData: true }
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPage(1); // Reset to the first page
      setShowResults(true); // Show the results section
    } else {
      setShowResults(false); // Hide results if input is empty
    }
  };
  const handleShowMore = () => {
    setPage((prev) => prev + 1); // Increment the page number
    fetchNextPage(); // Fetch the next set of professionals
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // <-- new: use location to determine active route (no extra state)
  const location = useLocation();
  const isQuestionsActive = location.pathname.startsWith("/questions");

  const canToggleRole =
    Array.isArray(user?.roles) &&
    ((user?.roles.includes("professional") && user?.roles.includes("asker")) ||
      (user?.roles.length === 1 && user?.roles[0] === "asker"));

  const switchLabel =
    user?.activeRole === "professional"
      ? "Switch to Asker"
      : "Switch to Professional";

  const modalRef = useRef(null);
  const resultsRef = useRef(null);

  const userProfilePic =
    user?.profilePic ||
    "https://static.vecteezy.com/system/resources/thumbnails/028/569/170/small_2x/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg";
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

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target) &&
        e.target.getAttribute("data-dropdown") !== "true"
      ) {
        setShowResults(false);
      }
    }
    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  return (
    <div className="w-full sticky top-0 z-50">
      {console.log("isLoading", isLoading)}
      <RoleSwitchOverlay show={isLoading} />

      <nav
        className={`transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-white/70 shadow-md" : tailwindclass
        } px-4 lg:px-8 py-3 flex items-center justify-between`}
      >
        {/* Logo */}
        <div className="flex items-center relative lg:left-10">
          <Link to="/">
            <img src={logo} alt="AskMeDirect" className="w-24 lg:w-28" />
          </Link>
        </div>

        {/* Desktop Center Section */}

        <div className="hidden lg:flex flex-1 justify-center gap-2">
          {user?.activeRole === "asker" ? (
            <>
              <div className="flex items-center bg-[#F0F1F3] relative rounded-full px-4 py-2 w-[340px] max-w-md">
                <img src={findIcon} alt="Search" className="w-4 h-4 mr-2" />

                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      setPage(1);
                      setShowResults(true);
                    }
                  }}
                />
                <img
                  src={dropdownIcon}
                  alt="Dropdown"
                  data-dropdown="true"
                  onClick={() => setShowResults((prev) => !prev)}
                  className="w-4 h-4 ml-2 cursor-pointer"
                />

                {showResults && (
                  <div
                    ref={resultsRef}
                    className="absolute top-10 left-0 mt-2 w-full bg-white shadow-lg rounded-lg p-4 z-20"
                  >
                    {isPending ? (
                      <p>Loading...</p>
                    ) : data?.results?.length > 0 ? (
                      <div
                        className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto max-h-[300px] px-2"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "#ccc #f0f0f0",
                        }}
                      >
                        {data.results.map((professional) => (
                          <ProfessionalCard
                            key={professional._id}
                            professional={professional}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        No results to show
                      </p>
                    )}
                    {data?.results?.length > 0 &&
                      data?.results?.length < data?.total && (
                        <button
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={handleShowMore}
                          disabled={isPending}
                        >
                          {isPending ? "Loading..." : "Show More"}
                        </button>
                      )}
                  </div>
                )}
              </div>
              <button
                className="ml-4 bg-blue-600 rounded-full w-9 h-9 flex items-center justify-center"
                onClick={handleSearch}
              >
                <img src={searchIcon} alt="Search" className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex  items-center jusitfy-between gap-3  cursor-pointer ">
              {/* <div>How it works</div>
              <div>Professionals</div>
              <div>Askers</div>
              <div>FAQs</div> */}
              <a
                href="/#how-it-works"
                className="cursor-pointer hover:text-blue-600"
              >
                How it works
              </a>
              <a
                href="/#how-it-works"
                className="cursor-pointer hover:text-blue-600"
              >
                Professionals
              </a>
              <a
                href="/#how-it-works"
                className="cursor-pointer hover:text-blue-600"
              >
                Askers
              </a>
              <a href="/#faqs" className="cursor-pointer hover:text-blue-600">
                FAQs
              </a>
            </div>
          )}

          <div className="flex items-center justify-between space-between">
            <div className="w-[1px] h-6 bg-black mx-2"></div>
            <button
              className="flex items-center gap-1 text-blue-600 font-medium text-sm"
              disabled={true}
            >
              {user?.activeRole === "asker" ? (
                "Find a Professional"
              ) : (
                <Link to="/?section=prof-list">Find a Professional</Link>
              )}
            </button>
            <div className="flex items-center pl-4">
              <img src={userIcon} alt="User" className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-6 relative lg:right-10">
          {/* {!user?.isAdmin && (
            <Link
              to="/questions"
              aria-current={isQuestionsActive ? "page" : undefined}
              className={`rounded-full p-1 flex items-center justify-center transition`}
            >
              {isQuestionsActive ? <ActiveMessageIcon /> : <MessageLogo />}
            </Link>
          )} */}

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/signin" className="flex font-medium text-sm gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1078_6351)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.3333 11.6667C14.4071 11.6667 15.4393 12.0813 16.2148 12.8239C16.9903 13.5665 17.4492 14.5798 17.4958 15.6525L17.5 15.8333V17.5C17.4998 17.7124 17.4184 17.9167 17.2726 18.0711C17.1268 18.2256 16.9275 18.3185 16.7155 18.331C16.5035 18.3434 16.2947 18.2744 16.1318 18.1381C15.9689 18.0018 15.8643 17.8084 15.8392 17.5975L15.8333 17.5V15.8333C15.8334 15.1957 15.5897 14.5821 15.1523 14.1181C14.7148 13.6542 14.1166 13.3749 13.48 13.3375L13.3333 13.3333H6.66667C6.02899 13.3333 5.4154 13.5769 4.95145 14.0144C4.48749 14.4519 4.20824 15.0501 4.17083 15.6867L4.16667 15.8333V17.5C4.16643 17.7124 4.0851 17.9167 3.93929 18.0711C3.79349 18.2256 3.59421 18.3185 3.38217 18.331C3.17014 18.3434 2.96135 18.2744 2.79847 18.1381C2.6356 18.0018 2.53092 17.8084 2.50583 17.5975L2.5 17.5V15.8333C2.50006 14.7596 2.91462 13.7274 3.65722 12.9519C4.39982 12.1763 5.41313 11.7174 6.48583 11.6708L6.66667 11.6667H13.3333ZM10 1.66667C11.1051 1.66667 12.1649 2.10566 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83334C14.1667 6.93841 13.7277 7.99821 12.9463 8.77962C12.1649 9.56102 11.1051 10 10 10C8.89493 10 7.83512 9.56102 7.05372 8.77962C6.27232 7.99821 5.83333 6.93841 5.83333 5.83334C5.83333 4.72827 6.27232 3.66846 7.05372 2.88706C7.83512 2.10566 8.89493 1.66667 10 1.66667ZM10 3.33334C9.6717 3.33334 9.34661 3.398 9.04329 3.52364C8.73998 3.64928 8.46438 3.83343 8.23223 4.06557C8.00009 4.29772 7.81594 4.57332 7.6903 4.87663C7.56466 5.17994 7.5 5.50503 7.5 5.83334C7.5 6.16164 7.56466 6.48673 7.6903 6.79005C7.81594 7.09336 8.00009 7.36896 8.23223 7.60111C8.46438 7.83325 8.73998 8.0174 9.04329 8.14304C9.34661 8.26867 9.6717 8.33334 10 8.33334C10.663 8.33334 11.2989 8.06995 11.7678 7.60111C12.2366 7.13226 12.5 6.49638 12.5 5.83334C12.5 5.1703 12.2366 4.53441 11.7678 4.06557C11.2989 3.59673 10.663 3.33334 10 3.33334Z"
                      fill="#2F2E41"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1078_6351">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#086BFF] text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <>
              {/* Existing user controls for logged in users */}
              {!user?.isAdmin && (
                <Link
                  to="/questions"
                  aria-current={isQuestionsActive ? "page" : undefined}
                  className={`rounded-full p-1 flex items-center justify-center transition`}
                >
                  {isQuestionsActive ? <ActiveMessageIcon /> : <MessageLogo />}
                </Link>
              )}
              {/* Profile section */}

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
                                  await registerStep2({
                                    email: user.email,
                                    role: "professional",
                                  });
                                  if (
                                    typeof refreshCurrentUser === "function"
                                  ) {
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

                    <div className="border-t border-gray-200" />

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
            </>
          )}

          {/* <img src={bellIcon} alt="Bell" className="w-5 h-5" /> */}

          {/* Profile: clickable avatar opens modal-style card */}
          {/* <div className="relative">
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
                              await registerStep2({
                                email: user.email,
                                role: "professional",
                              });
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

                <div className="border-t border-gray-200" />

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
          </div> */}
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
