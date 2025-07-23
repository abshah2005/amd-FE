import React, { useState, useMemo, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import find from "../assets/find.svg";
import DropdownSelector from "./DropdownSelector";
import CategoriesSlider from "./Categories";
import AskQuestionModal from "./AskQuestionModal";

const professionals = [
  {
    id: 1,
    name: "Alex Hales",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Startup Legal Advisor, Career Coach",
    associated: "Oxford",
    priceStart: 20,
    priceEnd: 35,
    rating: 4.2,
    ratingCount: 12,
    tags: [
      "Business",
      "Fundraising",
      "Pitch decks",
      "Legal Advice",
      "Career Coaching",
    ],
    delivery: 7,
    verified: true,
    featured: true,
    languages: ["English", "French"],
    location: "UK",
    description:
      "Helping early-stage founders navigate legal hurdles — from incorporation to investor agreements — with clarity and confidence. Empowering professionals to land their dream roles, switch careers, and grow with purpose — one step at a time.",
  },
  {
    id: 2,
    name: "Sara Khan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Marketing Strategist",
    associated: "Harvard",
    priceStart: 40,
    priceEnd: 60,
    rating: 4.8,
    ratingCount: 18,
    tags: ["Marketing", "Branding", "Social Media"],
    delivery: 1,
    verified: true,
    featured: false,
    languages: ["English", "Spanish"],
    location: "USA",
    description:
      "Expert in digital marketing, branding, and social media strategy. Helping startups and established businesses grow their online presence and reach their target audience effectively.",
  },
  {
    id: 3,
    name: "John Lee",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    title: "Finance Consultant",
    associated: "Stanford",
    priceStart: 30,
    priceEnd: 50,
    rating: 4.5,
    ratingCount: 9,
    tags: ["Finance", "Investment", "Tax"],
    delivery: 10,
    verified: false,
    featured: false,
    languages: ["English", "Chinese"],
    location: "Singapore",
    description:
      "Providing financial advice, investment strategies, and tax planning for individuals and businesses. Experienced in international finance and cross-border transactions.",
  },
  {
    id: 4,
    name: "Emily Carter",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    title: "HR & Recruitment Expert",
    associated: "MIT",
    priceStart: 25,
    priceEnd: 40,
    rating: 4.7,
    ratingCount: 15,
    tags: ["HR & Recruitment", "Career Coaching"],
    delivery: 7,
    verified: true,
    featured: false,
    languages: ["English"],
    location: "Canada",
    description:
      "Specialist in HR, recruitment, and career coaching. Helping companies build strong teams and professionals find their ideal roles.",
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    title: "Legal Advisor",
    associated: "Yale",
    priceStart: 35,
    priceEnd: 55,
    rating: 4.1,
    ratingCount: 7,
    tags: ["Legal Advice", "Business"],
    delivery: 10,
    verified: false,
    featured: false,
    languages: ["English", "German"],
    location: "Germany",
    description:
      "Experienced legal advisor for startups and SMEs. Expertise in contracts, business law, and compliance.",
  },
  {
    id: 6,
    name: "Linda Smith",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "Design Consultant",
    associated: "Parsons",
    priceStart: 50,
    priceEnd: 70,
    rating: 4.9,
    ratingCount: 22,
    tags: ["Design", "Branding"],
    delivery: 1,
    verified: true,
    featured: false,
    languages: ["English", "Italian"],
    location: "Italy",
    description:
      "Award-winning designer helping brands stand out with creative design solutions and branding strategies.",
  },
  // Add more professionals as needed for pagination
];

const allTags = [
  "Business",
  "Fundraising",
  "Pitch decks",
  "Marketing",
  "Branding",
  "Social Media",
  "Finance",
  "Investment",
  "Tax",
  "HR & Recruitment",
  "Career Coaching",
  "Legal Advice",
  "Design",
];

const allLanguages = [
  "English",
  "French",
  "Spanish",
  "Chinese",
  "German",
  "Italian",
];

const categories = [
  { id: 1, name: "IT Consultation" },
  { id: 2, name: "Business Strategy" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Legal Advice" },
  { id: 5, name: "Finance" },
  { id: 6, name: "HR & Recruitment" },
  { id: 7, name: "Design" },
  { id: 8, name: "Sales" },
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

const PAGE_SIZE = 3;

const Professionals = () => {
  // Filter states
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [category, setCategory] = useState("All");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [tags, setTags] = useState([]);
  const [budget, setBudget] = useState([10, 100]);
  const [delivery, setDelivery] = useState([]);
  const [rating, setRating] = useState([]);
  const [verified, setVerified] = useState("");
  const [language, setLanguage] = useState([]);
  const [location, setLocation] = useState([]);

  const [page, setPage] = useState(1);

  // Mobile filter modal state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Prevent background scroll when mobile filter modal is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileFilters]);

  // Filtering logic
  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      if (category !== "All" && !prof.tags.includes(category)) return false;
      if (tags.length && !tags.every((tag) => prof.tags.includes(tag)))
        return false;
      if (budget && (prof.priceStart > budget[1] || prof.priceEnd < budget[0]))
        return false;
      if (delivery.length && !delivery.some((d) => prof.delivery <= Number(d)))
        return false;
      if (
        rating.length &&
        !rating.some((r) => Math.floor(prof.rating) >= Number(r))
      )
        return false;
      if (verified !== "" && prof.verified !== verified) return false;
      if (language.length && !language.every((l) => prof.languages.includes(l)))
        return false;
      if (location.length && !location.includes(prof.location)) return false;
      return true;
    });
  }, [category, tags, budget, delivery, rating, verified, language, location]);

  const totalPages = Math.ceil(filteredProfessionals.length / PAGE_SIZE);
  const paginatedProfessionals = filteredProfessionals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Handlers
  const handleTagChange = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(1);
  };

  const handleBudgetChange = (e, idx) => {
    const val = Number(e.target.value);
    setBudget((prev) =>
      idx === 0
        ? [val, prev[1] < val ? val : prev[1]]
        : [prev[0] > val ? val : prev[0], val]
    );
    setPage(1);
  };

  const handleDeliveryChange = (val) => {
    setDelivery((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
    setPage(1);
  };

  const handleRatingChange = (val) => {
    setRating((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
    setPage(1);
  };

  const handleVerifiedChange = (val) => {
    setVerified(val);
    setPage(1);
  };

  // Reset filters
  const clearFilters = () => {
    setCategory("All");
    setTags([]);
    setBudget([10, 100]);
    setDelivery([]);
    setRating([]);
    setVerified("");
    setLanguage([]);
    setLocation([]);
    setPage(1);
  };

  // Tag display logic for card
  const renderTags = (tags) => {
    const mainTags = tags.slice(0, 3);
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

  // Delivery time label
  const getDeliveryLabel = (days) => {
    if (days <= 1) return "Less than 24hr";
    if (days <= 7) return "Less than 7 days";
    if (days <= 10) return "Less than 10 days";
    return `Within ${days} days`;
  };

  const ProfessionalCardDesktop = ({ prof }) => (
    <>
      <div
        key={prof.id}
        className={`flex items-center gap-6 bg-white rounded-xl  p-4 mb-6  relative`}
      >
        <div className="relative">
          <img
            src={prof.avatar}
            alt={prof.name}
            className={`w-44 h-52 rounded-xl object-cover ${
              prof.featured ? "border-4 border-yellow-400" : ""
            }`}
          />
          {prof.featured && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-white shadow">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-lg">{prof.name}</span>
            {prof.verified && (
              <MdVerified
                className="text-green-500"
                title="Verified"
                size={18}
              />
            )}
          </div>
          <div className="text-sm text-gray-600 mb-1 flex flex-wrap gap-2">
            {prof.title}
            {prof.associated && (
              <span className="ml-2">· associated with {prof.associated}</span>
            )}
          </div>
          <div className="flex gap-4 items-center mb-2">
            <span className="font-semibold">
              ${prof.priceStart}-${prof.priceEnd}{" "}
              <span className="text-gray-500 text-xs">per question</span>
            </span>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
              <FaStar size={16} /> {prof.rating}
              <span className="text-gray-500 text-xs ml-1">
                ({prof.ratingCount})
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {renderTags(prof.tags)}
          </div>
          <div className="text-gray-700 text-sm mb-2">{prof.description}</div>
        </div>
        <div className="flex flex-col items-center gap-3 min-w-[160px] h-[28vh] justify-between">
          <div>
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition"
              onClick={() => {
                setSelectedProfessional(prof);
                setShowModal(true);
              }}
            >
              Ask a question
            </button>
          </div>
          <div className="flex flex-col items-end gap-1 mt-auto">
            <span className="text-xs text-gray-500">
              Delivery Time: {getDeliveryLabel(prof.delivery)}
            </span>
          </div>
        </div>
      </div>
      <hr className="hidden lg:block lg:w-full pl-4  border-gray-200 mb-4" />
    </>
  );

  // Helper: Professional Card for mobile
  const ProfessionalCardMobile = ({ prof }) => (
    <div
      key={prof.id}
      className="bg-white rounded-xl shadow p-4 mb-6 border flex flex-col relative"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <img
            src={prof.avatar}
            alt={prof.name}
            className={`w-16 h-16 rounded-xl object-cover ${
              prof.featured ? "border-2 border-yellow-400" : ""
            }`}
          />
          {prof.featured && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-semibold px-1 py-0.5 rounded text-white shadow">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-base">{prof.name}</span>
            {prof.verified && (
              // <MdVerified
              //   className="text-green-500"
              //   title="Verified"
              //   size={14}
              // />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3334 8.66664C13.3334 12 11.0001 13.6666 8.22675 14.6333C8.08152 14.6825 7.92377 14.6802 7.78008 14.6266C5.00008 13.6666 2.66675 12 2.66675 8.66664V3.99997C2.66675 3.82316 2.73699 3.65359 2.86201 3.52857C2.98703 3.40355 3.1566 3.33331 3.33341 3.33331C4.66675 3.33331 6.33341 2.53331 7.49341 1.51997C7.63465 1.39931 7.81432 1.33301 8.00008 1.33301C8.18585 1.33301 8.36551 1.39931 8.50675 1.51997C9.67342 2.53997 11.3334 3.33331 12.6667 3.33331C12.8436 3.33331 13.0131 3.40355 13.1382 3.52857C13.2632 3.65359 13.3334 3.82316 13.3334 3.99997V8.66664Z"
                  stroke="#36B37E"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7.99984L7.33333 9.33317L10 6.6665"
                  stroke="#36B37E"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="text-xs text-gray-600 flex flex-wrap gap-1">
            {prof.title}
            {prof.associated && (
              <span className="ml-1">· {prof.associated}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center mb-2">
        <span className="font-semibold text-sm">
          ${prof.priceStart}-{prof.priceEnd}
          <span className="text-gray-500 text-xs">/question</span>
        </span>
        <span className="flex items-center gap-1 text-yellow-500 font-medium text-xs">
          <FaStar size={12} /> {prof.rating}
          <span className="text-gray-500 text-xs ml-1">
            ({prof.ratingCount})
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">{renderTags(prof.tags)}</div>
      <div className="text-gray-700 text-xs mb-2 line-clamp-3">
        {prof.description}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">
          Delivery: {getDeliveryLabel(prof.delivery)}
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
    <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
      {/* Mobile Filters Button */}
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-base"
          onClick={() => setShowMobileFilters(true)}
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
            options={["AI, Business, etc", ...allTags]}
            value={category}
            onChange={(val) => {
              setCategory(val);
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
                {tags.map((tag) => (
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
                onClick={() => setShowTagDropdown((v) => !v)}
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
            {showTagDropdown && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                      tags.includes(tag)
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      if (tags.includes(tag)) {
                        handleTagChange(tag);
                      } else if (tags.length < 2) {
                        handleTagChange(tag);
                      }
                      setShowTagDropdown(false);
                    }}
                    disabled={!tags.includes(tag) && tags.length >= 2}
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
          <label className="block text-sm font-medium mb-1">Budget Range</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">${budget[0]}</span>
              <span className="text-xs text-gray-500">${budget[1]}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={100}
                value={budget[0]}
                onChange={(e) => handleBudgetChange(e, 0)}
                className="flex-1 accent-blue-600"
              />
              <input
                type="range"
                min={10}
                max={100}
                value={budget[1]}
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
                  checked={delivery.includes(opt.value)}
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
                  checked={rating.includes(opt.value)}
                  onChange={() => handleRatingChange(opt.value)}
                  className="accent-blue-600"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Verified</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                checked={verified === true}
                onChange={() => handleVerifiedChange(true)}
                className="accent-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                checked={verified === false}
                onChange={() => handleVerifiedChange(false)}
                className="accent-blue-600"
              />
              No
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Language</label>
          <DropdownSelector
            options={allLanguages}
            value={language}
            onChange={(val) => {
              setLanguage(val);
              setPage(1);
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
            value={location}
            onChange={(val) => {
              setLocation(val);
              setPage(1);
            }}
            multi={true}
            max={2}
            placeholder="Select location"
          />
        </div>
      </div>
      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 lg:hidden">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowMobileFilters(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <DropdownSelector
                options={["AI, Business, etc", ...allTags]}
                value={category}
                onChange={(val) => {
                  setCategory(val);
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
                    {tags.map((tag) => (
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
                    onClick={() => setShowTagDropdown((v) => !v)}
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
                {showTagDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                          tags.includes(tag)
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          if (tags.includes(tag)) {
                            handleTagChange(tag);
                          } else if (tags.length < 2) {
                            handleTagChange(tag);
                          }
                          setShowTagDropdown(false);
                        }}
                        disabled={!tags.includes(tag) && tags.length >= 2}
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
                  <span className="text-xs text-gray-500">${budget[0]}</span>
                  <span className="text-xs text-gray-500">${budget[1]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={budget[0]}
                    onChange={(e) => handleBudgetChange(e, 0)}
                    className="flex-1 accent-blue-600"
                  />
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={budget[1]}
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
                      checked={delivery.includes(opt.value)}
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
                      checked={rating.includes(opt.value)}
                      onChange={() => handleRatingChange(opt.value)}
                      className="accent-blue-600"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Verified</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    checked={verified === true}
                    onChange={() => handleVerifiedChange(true)}
                    className="accent-blue-600"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    checked={verified === false}
                    onChange={() => handleVerifiedChange(false)}
                    className="accent-blue-600"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Language */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Language</label>
              <DropdownSelector
                options={allLanguages}
                value={language}
                onChange={(val) => {
                  setLanguage(val);
                  setPage(1);
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
                value={location}
                onChange={(val) => {
                  setLocation(val);
                  setPage(1);
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
                setShowMobileFilters(false);
              }}
            >
              Clear Filters
            </button>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-base mt-2"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Professionals */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">
          Choose a professional.{" "}
          <span className="font-normal">Write your question. Get Answer</span>
        </h2>
        <p className="mb-6 text-gray-600">
          Getting trusted advice is a smart way to move faster, solve problems,
          or grow your ideas.
        </p>
        {paginatedProfessionals.length === 0 ? (
          <div className="text-gray-500 mt-8">
            No professionals found for selected filters.
          </div>
        ) : (
          <>
            {/* Desktop cards */}
            <div className="hidden lg:block">
              {paginatedProfessionals.map((prof) => (
                <ProfessionalCardDesktop key={prof.id} prof={prof} />
              ))}
            </div>
            {/* Mobile cards */}
            <div className="block lg:hidden">
              {paginatedProfessionals.map((prof) => (
                <ProfessionalCardMobile key={prof.id} prof={prof} />
              ))}
            </div>
          </>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className={`px-3 py-1 rounded border ${
                page === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
              }`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <FiChevronLeft size={18} />
            </button>
            <span className="font-semibold text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              className={`px-3 py-1 rounded border ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
              }`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      {showModal && selectedProfessional && (
        <AskQuestionModal
          professional={selectedProfessional}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Professionals;
