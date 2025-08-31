import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackSlider from "./FeedbackSlider";
import SkeletonProfile from "./SkeletonProfile";
import Linkedin from "../icons/linkedin";
import Facebook from "../icons/facebook";
import Instagram from "../icons/instagram";
import Website from "../icons/website";
import Verified from "../icons/verified";
import Star from "../icons/star";
import AskQuestionModal from "./AskQuestionModal";
import useProfessionalProfile from "../hooks/UseProfessionalProfile";

const dummyData = {
  id: 1,
  name: "Alex Hales",
  title: "Startup Legal Advisor, Career Coach",
  featured: true,
  associated: "associated with Oxford",
  priceRangeLow: 20,
  priceRangeHigh: 69,
  currency: "$",
  perQuestion: "per question",
  rating: 4.2,
  ratingCount: 12,
  languages: ["English", "Spanish", "Chinese"],
  country: "Spain",
  profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
  verified: true,
  socialLinks: [
    { type: "linkedin", url: "#" },
    { type: "facebook", url: "#" },
    { type: "instagram", url: "#" },
    { type: "website", url: "#" },
  ],
  about: [
    "How should I structure my consulting agreement to protect my IP?",
    "How should I structure my consulting agreement to protect my IP?",
    "How should I structure my consulting agreement to protect my IP?",
  ],
  experience: ["10+ years advising startups", "In-house counsel at Acme Inc."],
  expertise: Array(12).fill("Business"),
  exampleQuestions: [
    "How should I structure my consulting agreement to protect my IP?",
    "What are the tax implications of this contract?",
  ],
  deliveryTime: "Less than 7 days",
  feedback: [
    {
      name: "John Doe",
      date: "2025/02/01",
      rating: 4.0,
      text: "The answer is insightful and well-explained.",
    },
  ],
};

const iconMap = {
  linkedin: <Linkedin />,
  facebook: <Facebook />,
  instagram: <Instagram />,
  website: <Website />,
  verified: <Verified />,
  star: <Star />,
};

const PublicProfilePage = () => {
    const navigate = useNavigate();
  const { name } = useParams();
  const { data: professional, isLoading, error } = useProfessionalProfile(name);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const getDeliveryLabel = (days) => {
    if (days <= 1) return "Less than 24hr";
    if (days <= 7) return "Less than 7 days";
    if (days <= 10) return "Less than 10 days";
    return `Within ${days} days`;
  };

  if (isLoading)
    return <SkeletonProfile />;
  if (error || !professional)
    return <div className="flex justify-center items-center h-screen">Professional not found.</div>;

  const prof = {
    ...dummyData,
    ...(professional || {}),
    profilePicture:
      professional?.profilePic ||
      professional?.profilePicture ||
      dummyData.profilePicture,
    name:
      professional?.fullName ||
      `${professional?.firstName || ""} ${professional?.lastName || ""}`.trim() ||
      professional?.name ||
      dummyData.name,
    priceRangeLow:
      professional?.priceRangeLow ??
      professional?.minPrice ??
      dummyData.priceRangeLow,
    priceRangeHigh:
      professional?.priceRangeHigh ??
      professional?.maxPrice ??
      dummyData.priceRangeHigh,
    currency: professional?.currency ?? dummyData.currency,
    rating: professional?.rating ?? dummyData.rating,
    ratingCount: professional?.ratingCount ?? dummyData.ratingCount,
    verified: professional?.verified ?? dummyData.verified ?? false,
    featured: professional?.featured ?? dummyData.featured ?? false,
    // feedback:professional?.feedbacks || [],
    deliveryTime:
      professional?.deliveryTime ??
      professional?.delivery ??
      dummyData.deliveryTime,
    country:
      professional?.country ?? professional?.location ?? dummyData.country,
    title: professional?.title ?? dummyData.title,
    associated:
      professional?.associated ||
      (professional?.firmName
        ? `associated with ${professional.firmName}`
        : undefined) ||
      dummyData.associated,
    socialLinks: professional?.socialLinks ?? dummyData.socialLinks,
    expertise: professional?.tags ?? dummyData.expertise,
    feedback: professional?.feedback ?? dummyData.feedback,
    about:
      professional?.about == null
        ? dummyData.about
        : Array.isArray(professional.about)
        ? professional.about
        : [String(professional.about)],
    experience:
      professional?.experience == null
        ? dummyData.experience
        : Array.isArray(professional.experience)
        ? professional.experience
        : [String(professional.experience)],
    exampleQuestions:
      professional?.exampleQuestions == null
        ? dummyData.exampleQuestions
        : Array.isArray(professional.exampleQuestions)
        ? professional.exampleQuestions
        : [String(professional.exampleQuestions)],
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center py-10 ">
      <div className="bg-white  w-full  mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left */}
          <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col items-center">
            <div className="relative mb-2">
              <img
                className={`w-[120px] h-[150px] object-cover rounded-xl ${prof.featured ? "border-4 border-yellow-400" : ""} bg-gray-100`}
                src={prof.profilePicture}
                alt={prof.name}
              />
              {prof.featured && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded text-black border-4 border-yellow-400">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-semibold text-slate-900">
                {prof.name}
              </span>
              {prof.verified && (
                <span className="flex items-center">{iconMap.verified}</span>
              )}
            </div>
            <div className="text-sm text-slate-700 mb-1 text-center">
              {prof.tags.slice(0, 2).join(", ")}{" "}
              <span className="text-slate-500">• {prof.associated}</span>
            </div>
            <div className="flex gap-3 items-center mb-1 text-sm">
              <span className="text-blue-600 font-semibold">
                {prof.currency}
                {prof.priceRangeLow} - {prof.currency}
                {prof.priceRangeHigh}
              </span>
              <span className="text-slate-500">{prof.perQuestion}</span>
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                {iconMap.star} {prof.rating}
                <span className="text-slate-500 ml-1">
                  ({prof.ratingCount})
                </span>
              </span>
            </div>
            <div className="text-xs text-slate-500 mb-2 text-center">
              {(prof.languages || []).join(", ")}{" "}
              <span className="text-slate-500">• {prof.country}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white font-medium text-[15px] rounded-full py-2 mt-2 mb-2"
              onClick={() => {
                // setIsQuestionOpen(true)
                navigate("/signup");
            }}
            >
              Ask a question
            </button>
            <div className="w-full mb-3">
              <span className="text-xs text-slate-500 block mb-1">
                Social Links
              </span>
              <div className="flex  items-center justify-between gap-6">
                {prof.socialLinks.map((link) => (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconMap[link.type]}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs  px-4 py-1 self-start mb-2 flex-grow"></div>
            <div className="text-xs text-slate-500 bg-gray-100 rounded-xl px-4 py-1 self-start mb-2 mt-auto">
              Delivery Time: {getDeliveryLabel(prof.deliveryTime)}
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">
                About
              </div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {prof.about.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">
                Professional Experience
              </div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {prof.experience.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <FeedbackSlider feedback={prof.feedback} />
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">
                Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {prof.expertise.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 border border-blue-600 text-blue-700 rounded-lg px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4">
              <div className="font-semibold text-base text-slate-900 mb-2">
                Example Questions
              </div>
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {prof.exampleQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {isQuestionOpen && (
          <AskQuestionModal
            professional={prof}
            onClose={() => setIsQuestionOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PublicProfilePage;