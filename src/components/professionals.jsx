import React, { useReducer, useMemo, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import find from "../assets/find.svg";
import DropdownSelector from "./DropdownSelector";
import CategoriesSlider from "./Categories";
import AskQuestionModal from "./AskQuestionModal";
import ProfessionalProfileModal from "./ProfessionalProfileModal";
import useSpecializations from "../hooks/useSpecializations";
import useProfessionals from "../hooks/useProfessionals";
import ToggleSwitch from "./ToggleSwitch";

const allLanguages = [
  "English",
  "French",
  "Spanish",
  "Chinese",
  "German",
  "Italian",
];

const allLocations = ["UK", "USA", "Singapore", "Canada", "Germany", "Italy"];

const deliveryOptions = [
  { label: "Less than 24hr", value: 1 },
  { label: "Less than 7 days", value: 7 },
  { label: "Less than 10 days", value: 10 },
];

const ratingOptions = [
  { label: "1+ rating", value: 1 },
  { label: "2+ rating", value: 2 },
  { label: "3+ rating", value: 3 },
  { label: "4+ rating", value: 4 },
  { label: "5 rating", value: 5 },
];

const PAGE_SIZE = 5;

const initialState = {
  selectedCategory: "All",
  showModal: false,
  showProfileModal: false,
  selectedProfessional: null,
  category: "All",
  showTagDropdown: false,
  tags: [],
  budget: [10, 100],
  delivery: [],
  rating: [],
  verified: "",
  featured: false,
  language: [],
  location: [],
  page: 1,
  showMobileFilters: false,
};

// 2. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.value, page: 1 };
    case "SET_CATEGORY":
      return { ...state, category: action.value, page: 1 };
    case "SET_TAGS":
      return { ...state, tags: action.value, page: 1 };
    case "SET_BUDGET":
      return { ...state, budget: action.value, page: 1 };
    case "SET_DELIVERY":
      return { ...state, delivery: action.value, page: 1 };
    case "SET_RATING":
      return { ...state, rating: action.value, page: 1 };
    case "SET_VERIFIED":
      return { ...state, verified: action.value, page: 1 };
    case "SET_FEATURED":
      return { ...state, featured: action.value, page: 1 };
    case "SET_LANGUAGE":
      return { ...state, language: action.value, page: 1 };
    case "SET_LOCATION":
      return { ...state, location: action.value, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.value };
    case "SET_SELECTED_PROFESSIONAL":
      return { ...state, selectedProfessional: action.value };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.value };
    case "SET_SHOW_PROFILE_MODAL":
      return { ...state, showProfileModal: action.value };
    case "SET_SHOW_TAG_DROPDOWN":
      return { ...state, showTagDropdown: action.value };
    case "SET_SHOW_MOBILE_FILTERS":
      return { ...state, showMobileFilters: action.value };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const Professionals = () => {
  const { allSubCategories, specializations, loading } = useSpecializations();

  // 3. Use useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4. Replace all useState usages with state and dispatch
  useEffect(() => {
    if (state.showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.showMobileFilters]);

  const filters = useMemo(() => {
    // Only include page and limit if all filters are at their default
    const isDefault =
      (state.selectedCategory === "All" || !state.selectedCategory) &&
      (state.category === "All" || !state.category) &&
      (!state.tags || state.tags.length === 0) &&
      (!state.budget || (state.budget[0] === 10 && state.budget[1] === 100)) &&
      (!state.delivery || state.delivery.length === 0) &&
      (!state.rating || state.rating.length === 0) &&
      (state.verified === "" || state.verified === undefined) &&
      (!state.language || state.language.length === 0) &&
      (!state.location || state.location.length === 0) &&
      !state.featured;

    if (isDefault) {
      return { page: state.page, limit: PAGE_SIZE };
    }

    // Otherwise, include filters as before
    const tagParam = state.tags.length
      ? state.tags
      : (!state.selectedCategory || state.selectedCategory === "All") &&
        state.category &&
        state.category !== "All"
      ? [state.category]
      : undefined;

    const out = {
      page: state.page,
      limit: PAGE_SIZE,
      ...(state.selectedCategory && state.selectedCategory !== "All"
        ? { category: state.selectedCategory }
        : {}),
      ...(tagParam ? { tags: tagParam } : {}),
      ...(state.budget?.[0] !== undefined ? { minPrice: state.budget[0] } : {}),
      ...(state.budget?.[1] !== undefined ? { maxPrice: state.budget[1] } : {}),
      ...(state.delivery.length ? { delivery: state.delivery } : {}),
      ...(state.rating.length ? { rating: state.rating } : {}),
      ...(state.verified !== "" ? { verified: state.verified } : {}),
      ...(state.language.length ? { language: state.language } : {}),
      ...(state.location.length ? { country: state.location } : {}),
      ...(state.featured ? { featured: true } : {}),
    };
    return out;
  }, [
    state.page,
    state.selectedCategory,
    state.category,
    state.tags,
    state.budget,
    state.delivery,
    state.rating,
    state.verified,
    state.language,
    state.location,
    state.featured,
  ]);

  const {
    data: professionalsData,
    isLoading: professionalsLoading,
    isError: professionalsError,
  } = useProfessionals(filters, { debounceTime: 500 });
  const professionals = professionalsData?.results || [];
  const total = professionalsData?.total || 0;
  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  const paginatedProfessionals = professionals;

  // Handlers using dispatch
  const handleTagChange = (tag) => {
    const newTags = state.tags.includes(tag)
      ? state.tags.filter((t) => t !== tag)
      : [...state.tags, tag];
    dispatch({ type: "SET_TAGS", value: newTags });
  };

  const handleBudgetChange = (e, idx) => {
    const val = Number(e.target.value);
    const newBudget =
      idx === 0
        ? [val, state.budget[1] < val ? val : state.budget[1]]
        : [state.budget[0] > val ? val : state.budget[0], val];
    dispatch({ type: "SET_BUDGET", value: newBudget });
  };

  const handleDeliveryChange = (val) => {
    const newDelivery = state.delivery.includes(val)
      ? state.delivery.filter((v) => v !== val)
      : [...state.delivery, val];
    dispatch({ type: "SET_DELIVERY", value: newDelivery });
  };

  const handleRatingChange = (val) => {
    const newRating = state.rating.includes(val)
      ? state.rating.filter((v) => v !== val)
      : [...state.rating, val];
    dispatch({ type: "SET_RATING", value: newRating });
  };

  const handleVerifiedChange = (val) => {
    dispatch({ type: "SET_VERIFIED", value: val });
  };

  const clearFilters = () => {
    dispatch({ type: "RESET" });
  };

  const renderTags = (tags) => {
    const mainTags = tags.slice(0, 2);
    const extraCount = tags.length - 3;
    return (
      <>
        {mainTags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            +{extraCount}
          </span>
        )}
      </>
    );
  };
// Helper to get delivery label
  const getDeliveryLabel = (days) => {
    if (days <= 1) return "Less than 24hr";
    if (days <= 7) return "Less than 7 days";
    if (days <= 10) return "Less than 10 days";
    return `Within ${days} days`;
  };

  const ProfessionalCardDesktop = ({ prof }) => (
    <>
      <div
        key={prof._id}
        className={`flex items-center gap-6 bg-white rounded-xl  p-4 mb-6  relative`}
      >
        <div className="relative h-[34vh]">
          <img
            src={
              prof.profilePic ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt={`${prof.firstName || ""} ${prof.lastName || ""}`}
            onClick={() => {
              dispatch({ type: "SET_SELECTED_PROFESSIONAL", value: prof });
              dispatch({ type: "SET_SHOW_PROFILE_MODAL", value: true });
            }}
            style={{ cursor: "pointer" }}
            className={`w-44 h-52 rounded-xl object-cover ${
              prof.featured ? "border-4 border-yellow-400 " : ""
            }`}
          />
          {prof.featured && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-black shadow">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0  h-[34vh] ">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-lg">
              {`${prof.firstName || ""} ${prof.lastName || ""}`.trim()}
            </span>
            {prof.verified && (
              <MdVerified
                className="text-green-500"
                title="Verified"
                size={18}
              />
            )}
          </div>
          <div className="text-sm text-gray-600 mb-1 flex flex-wrap gap-2">
            {prof.tags && (
              <span className="font-medium">
                {prof.tags.slice(0, 2).join(", ")}
              </span>
            )}
            {prof.entityType === "firm" && prof.firmName && (
              <span className="ml-2">· associated with {prof.firmName}</span>
            )}
          </div>
          <div className="flex gap-4 items-center mb-2">
            <span className="font-semibold">
              {prof.currency}
              {prof.priceRangeLow ?? ""} - {prof.currency}
              {prof.priceRangeHigh ?? ""}{" "}
              <span className="text-gray-500 text-xs">per question</span>
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              <FaStar size={16} /> {prof.rating ?? 0}
              <span className="text-gray-500 text-xs ml-1">
                ({prof.ratingCount ?? 0})
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {renderTags(prof.tags || [])}
          </div>
          <div className="text-gray-700 text-sm mb-2">{prof.about[0]}</div>
        </div>
        <div className="flex flex-col items-center gap-3 min-w-[160px]  h-[34vh] justify-between">
          <div>
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition "
              onClick={() => {
                //             dispatch({ type: "SET_SELECTED_PROFESSIONAL", value: prof });
                // dispatch({ type: "SET_SHOW_MODAL", value: true });
                dispatch({ type: "SET_SELECTED_PROFESSIONAL", value: prof });
                dispatch({ type: "SET_SHOW_PROFILE_MODAL", value: true });
              }}
            >
              Open Profile
            </button>
          </div>
          <div className="flex flex-col items-end gap-1 mt-auto">
            <span className="text-xs text-gray-500">
              Delivery Time:{" "}
              {getDeliveryLabel(prof.deliveryTime ?? prof.delivery ?? 0)}
            </span>
          </div>
        </div>
      </div>
      <hr className="hidden lg:block lg:w-full pl-4  border-gray-200 mb-4" />
    </>
  );

  const ProfessionalCardMobile = ({ prof }) => (
    <div
      key={prof._id}
      className="bg-white rounded-xl shadow p-4 mb-6 border flex flex-col relative"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <img
            src={prof.profilePic || "/placeholder-avatar.png"}
            alt={`${prof.firstName || ""} ${prof.lastName || ""}`}
            className={`w-16 h-16 rounded-xl object-cover ${
              prof.featured ? "border-2 border-yellow-400" : ""
            }`}
          />
          {prof.featured && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-semibold px-1 py-0.5 rounded text-black shadow">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-base">
              {`${prof.firstName || ""} ${prof.lastName || ""}`.trim()}
            </span>
            {prof.verified && (
              <svg
                /* verified icon */ xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3334 8.66664C13.3334 12 11.0001 13.6666 8.22675 14.6333C8.08152 14.6825 7.92377 14.6802 7.78008 14.6266C5.00008 13.6666 2.66675 12 2.66675 8.66664V3.99997C2.66675 3.82316 2.73699 3.65359 2.86201 3.52857C2.98703 3.40355 3.1566 3.33331 3.33341 3.33331C4.66675 3.33331 6.33341 2.53331 7.49341 1.51997C7.63465 1.39931 7.81432 1.33301 8.00008 1.33301C8.18585 1.33301 8.36551 1.39931 8.50675 1.51997C9.67342 2.53997 11.3334 3.33331 12.6667 3.33331C12.8436 3.33331 13.0131 3.40355 13.1382 3.52857C13.2632 3.65359 13.3334 3.82316 13.3334 3.99997V8.66664Z"
                  stroke="#36B37E"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7.99984L7.33333 9.33317L10 6.6665"
                  stroke="#36B37E"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="text-xs text-gray-600 flex flex-wrap gap-1">
            {prof.title}
            {prof.entityType === "firm" && prof.firmName && (
              <span className="ml-1">· {prof.firmName}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <span className="font-semibold text-sm">
          ${prof.priceRangeLow ?? ""}-${prof.priceRangeHigh ?? ""}
          <span className="text-gray-500 text-xs">/question</span>
        </span>
        <span className="flex items-center gap-1 text-yellow-500 font-medium text-xs">
          <FaStar size={12} /> {prof.rating ?? 0}
          <span className="text-gray-500 text-xs ml-1">
            ({prof.ratingCount ?? 0})
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {renderTags(prof.tags || [])}
      </div>
      <div className="text-gray-700 text-xs mb-2 line-clamp-3">
        {prof.about}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">
          Delivery: {getDeliveryLabel(prof.deliveryTime ?? prof.delivery ?? 0)}
        </span>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold text-xs hover:bg-blue-700 transition"
          onClick={() => {
            setSelectedProfessional(prof);
            setShowModal(true);
          }}
        >
          Ask a question
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="w-full mb-6">
        <CategoriesSlider
          categories={[{ _id: "All", category: "All" }, ...specializations]}
          selectedCategory={state.selectedCategory}
          onSelect={(val) =>
            dispatch({ type: "SET_SELECTED_CATEGORY", value: val })
          }
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
        {/* Mobile Filters Button */}
        <div className="lg:hidden w-full mb-4">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-base"
            onClick={() =>
              dispatch({ type: "SET_SHOW_MOBILE_FILTERS", value: true })
            }
          >
            Filters
          </button>
        </div>

        {/* Filters for large screens */}
        <div className="lg:w-1/4 w-full bg-white rounded-xl shadow p-6 mb-4 lg:mb-0 hidden lg:block">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-lg">Filters</span>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <DropdownSelector
              options={["All", ...specializations.map((c) => c.category)]}
              value={state.category}
              onChange={(val) => {
                // keep human-readable label in `category` for UI, but prefer id for server filtering
                dispatch({ type: "SET_CATEGORY", value: val });
                const spec = specializations.find((s) => s.category === val);
                dispatch({
                  type: "SET_SELECTED_CATEGORY",
                  value: spec ? spec._id : "All",
                });
              }}
              placeholder="Select category"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tags (max - 2)
            </label>
            <div className="relative">
              <div className="flex items-center border rounded-full px-4 py-2 bg-white w-full">
                <span className="mr-2 text-gray-400">
                  <img src={find} alt="" />
                </span>
                <div className="flex gap-2 flex-wrap">
                  {state.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center bg-blue-50 border border-blue-400 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-blue-500 font-bold focus:outline-none"
                        onClick={() => handleTagChange(tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="ml-auto text-gray-400"
                  onClick={() =>
                    dispatch({
                      type: "SET_SHOW_TAG_DROPDOWN",
                      value: !state.showTagDropdown,
                    })
                  }
                  tabIndex={-1}
                >
                  <svg width="20" height="20" fill="none">
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <hr className="my-4 border-gray-200 border-1" />
              </div>
              {/* Dropdown */}
              {state.showTagDropdown && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
                  {allSubCategories.map((tag) => (
                    <button
                      key={tag}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                        state.tags.includes(tag)
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        if (state.tags.includes(tag)) {
                          handleTagChange(tag);
                        } else if (state.tags.length < 2) {
                          handleTagChange(tag);
                        }
                        dispatch({
                          type: "SET_SHOW_TAG_DROPDOWN",
                          value: false,
                        });
                      }}
                      disabled={
                        !state.tags.includes(tag) && state.tags.length >= 2
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Budget Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Budget Range
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  ${state.budget[0]}
                </span>
                <span className="text-xs text-gray-500">
                  ${state.budget[1]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={state.budget[0]}
                  onChange={(e) => handleBudgetChange(e, 0)}
                  className="flex-1 accent-blue-600"
                />
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={state.budget[1]}
                  onChange={(e) => handleBudgetChange(e, 1)}
                  className="flex-1 accent-blue-600"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <hr className="my-4 border-gray-200 border-1" />
          </div>
          {/* Delivery Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Delivery Time
            </label>
            <div className="flex flex-col gap-2">
              {deliveryOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={state.delivery.includes(opt.value)}
                    onChange={() => handleDeliveryChange(opt.value)}
                    className="accent-blue-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <hr className="my-4 border-gray-200 border-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex flex-col gap-2">
              {ratingOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={state.rating.includes(opt.value)}
                    onChange={() => handleRatingChange(opt.value)}
                    className="accent-blue-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <hr className="my-4 border-gray-200 border-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Verified</label>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={state.verified === true}
                  onChange={() => handleVerifiedChange(true)}
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={state.verified === false}
                  onChange={() => handleVerifiedChange(false)}
                  className="accent-blue-600"
                />
                No
              </label>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <hr className="my-4 border-gray-200 border-1" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Featured</label>
            <ToggleSwitch
              checked={state.featured}
              onChange={() => {
                dispatch({ type: "SET_FEATURED", value: !state.featured });
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <hr className="my-4 border-gray-200 border-1" />
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Language</label>
            <DropdownSelector
              options={allLanguages}
              value={state.language}
              onChange={(val) => {
                dispatch({ type: "SET_LANGUAGE", value: val });
              }}
              multi={true}
              max={2}
              placeholder="Select language"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <DropdownSelector
              options={allLocations}
              value={state.location}
              onChange={(val) => {
                dispatch({ type: "SET_LOCATION", value: val });
              }}
              multi={true}
              max={2}
              placeholder="Select location"
            />
          </div>
        </div>
        {/* Mobile Filters Modal */}
        {state.showMobileFilters && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 lg:hidden">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() =>
                  dispatch({ type: "SET_SHOW_MOBILE_FILTERS", value: false })
                }
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <DropdownSelector
                  options={["AI, Business, etc", ...allTags]}
                  value={state.category}
                  onChange={(val) => {
                    dispatch({ type: "SET_CATEGORY", value: val });
                    setPage(1);
                  }}
                  placeholder="Select category"
                />
              </div>
              {/* Tags */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tags (max - 2)
                </label>
                <div className="relative">
                  <div className="flex items-center border rounded-full px-4 py-2 bg-white w-full">
                    <span className="mr-2 text-gray-400">
                      <img src={find} alt="" />
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {state.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center bg-blue-50 border border-blue-400 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1 text-blue-500 font-bold focus:outline-none"
                            onClick={() => handleTagChange(tag)}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ml-auto text-gray-400"
                      onClick={() =>
                        dispatch({
                          type: "SET_SHOW_TAG_DROPDOWN",
                          value: !state.showTagDropdown,
                        })
                      }
                      tabIndex={-1}
                    >
                      <svg width="20" height="20" fill="none">
                        <path
                          d="M6 8l4 4 4-4"
                          stroke="#94A3B8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Dropdown */}
                  {state.showTagDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                            state.tags.includes(tag)
                              ? "bg-blue-100 text-blue-700 font-semibold"
                              : "text-gray-700"
                          }`}
                          onClick={() => {
                            if (state.tags.includes(tag)) {
                              handleTagChange(tag);
                            } else if (state.tags.length < 2) {
                              handleTagChange(tag);
                            }
                            dispatch({
                              type: "SET_SHOW_TAG_DROPDOWN",
                              value: false,
                            });
                          }}
                          disabled={
                            !state.tags.includes(tag) && state.tags.length >= 2
                          }
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Budget Range
                </label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      ${state.budget[0]}
                    </span>
                    <span className="text-xs text-gray-500">
                      ${state.budget[1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={state.budget[0]}
                      onChange={(e) => handleBudgetChange(e, 0)}
                      className="flex-1 accent-blue-600"
                    />
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={state.budget[1]}
                      onChange={(e) => handleBudgetChange(e, 1)}
                      className="flex-1 accent-blue-600"
                    />
                  </div>
                </div>
              </div>
              {/* Delivery Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Delivery Time
                </label>
                <div className="flex flex-col gap-2">
                  {deliveryOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={state.delivery.includes(opt.value)}
                        onChange={() => handleDeliveryChange(opt.value)}
                        className="accent-blue-600"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex flex-col gap-2">
                  {ratingOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={state.rating.includes(opt.value)}
                        onChange={() => handleRatingChange(opt.value)}
                        className="accent-blue-600"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Verified
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={state.verified === true}
                      onChange={() => handleVerifiedChange(true)}
                      className="accent-blue-600"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={state.verified === false}
                      onChange={() => handleVerifiedChange(false)}
                      className="accent-blue-600"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Language */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Language
                </label>
                <DropdownSelector
                  options={allLanguages}
                  value={state.language}
                  onChange={(val) => {
                    dispatch({ type: "SET_LANGUAGE", value: val });
                  }}
                  multi={true}
                  max={2}
                  placeholder="Select language"
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <DropdownSelector
                  options={allLocations}
                  value={state.location}
                  onChange={(val) => {
                    dispatch({ type: "SET_LOCATION", value: val });
                  }}
                  multi={true}
                  max={2}
                  placeholder="Select location"
                />
              </div>

              {/* Clear Filters Button */}
              <button
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold text-base mt-4"
                onClick={() => {
                  clearFilters();
                  dispatch({ type: "SET_SHOW_MOBILE_FILTERS", value: false });
                }}
              >
                Clear Filters
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-base mt-2"
                onClick={() =>
                  dispatch({ type: "SET_SHOW_MOBILE_FILTERS", value: false })
                }
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Professionals */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            Choose a professional.{" "}
            <span className="font-normal text-gray-500 font-semibold">
              Write your question. Get Answer
            </span>
          </h2>
          <p className="mb-6 text-gray-600">
            Getting trusted advice is a smart way to move faster, solve
            problems, or grow your ideas.
          </p>

          {/* Listing area: show loader or error without hiding filters/categories */}
          {professionalsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <span className="text-gray-600">Loading professionals…</span>
              </div>
            </div>
          ) : professionalsError ? (
            <div className="text-red-600 mt-6">
              Failed to load professionals
            </div>
          ) : paginatedProfessionals.length === 0 ? (
            <div className="text-gray-500 mt-8">
              No professionals found for selected filters.
            </div>
          ) : (
            <>
              {/* Desktop cards */}
              <div className="hidden lg:block">
                {paginatedProfessionals.map((prof) => (
                  <ProfessionalCardDesktop key={prof._id} prof={prof} />
                ))}
              </div>
              {/* Mobile cards */}
              <div className="block lg:hidden">
                {paginatedProfessionals.map((prof) => (
                  <ProfessionalCardMobile key={prof._id} prof={prof} />
                ))}
              </div>
            </>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                className={`px-3 py-1 rounded border ${
                  state.page === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
                }`}
                onClick={() =>
                  dispatch({
                    type: "SET_PAGE",
                    value: Math.max(1, state.page - 1),
                  })
                }
                disabled={state.page === 1}
              >
                <FiChevronLeft size={18} />
              </button>
              <span className="font-semibold text-sm">
                Page {state.page} of {totalPages}
              </span>
              <button
                className={`px-3 py-1 rounded border ${
                  state.page === totalPages
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
                }`}
                onClick={() =>
                  dispatch({
                    type: "SET_PAGE",
                    value: Math.min(totalPages, state.page + 1),
                  })
                }
                disabled={state.page === totalPages}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
        {state.showProfileModal && state.selectedProfessional && (
          <ProfessionalProfileModal
            // professionalId={state.selectedProfessional._id}
            professional={state.selectedProfessional}
            onClose={() =>
              dispatch({ type: "SET_SHOW_PROFILE_MODAL", value: false })
            }
          />
        )}
        {state.showModal && state.selectedProfessional && (
          <AskQuestionModal
            professional={state.selectedProfessional}
            onClose={() => dispatch({ type: "SET_SHOW_MODAL", value: false })}
          />
        )}
      </div>
    </div>
  );
};

export default Professionals;
