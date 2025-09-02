import React, { useState } from "react";

const ArrowLeft = () => (
  <svg width="24" height="24" fill="none">
    <path
      d="M15 6l-6 6 6 6"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ArrowRight = () => (
  <svg width="24" height="24" fill="none">
    <path
      d="M9 6l6 6-6 6"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Star = ({ filled, half }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M6.13888 0.413757C6.21224 0.287863 6.31733 0.183406 6.44367 0.110806C6.57 0.0382057 6.71317 0 6.85888 0C7.00459 0 7.14775 0.0382057 7.27409 0.110806C7.40042 0.183406 7.50551 0.287863 7.57888 0.413757L9.44221 3.61242L13.0609 4.39642C13.2032 4.42735 13.335 4.49506 13.443 4.59278C13.551 4.6905 13.6315 4.81483 13.6765 4.95337C13.7215 5.09191 13.7294 5.23983 13.6994 5.38237C13.6694 5.52491 13.6026 5.6571 13.5055 5.76576L11.0389 8.52642L11.4122 12.2098C11.4269 12.3548 11.4034 12.5012 11.3438 12.6342C11.2843 12.7673 11.1909 12.8824 11.073 12.9681C10.955 13.0538 10.8167 13.1071 10.6717 13.1226C10.5267 13.1381 10.3803 13.1153 10.2469 13.0564L6.85888 11.5631L3.47088 13.0564C3.33749 13.1153 3.191 13.1381 3.04605 13.1226C2.90109 13.1071 2.76273 13.0538 2.64479 12.9681C2.52685 12.8824 2.43345 12.7673 2.37392 12.6342C2.31439 12.5012 2.29082 12.3548 2.30554 12.2098L2.67888 8.52642L0.21221 5.76642C0.115029 5.65777 0.0480471 5.52553 0.0179526 5.3829C-0.0121418 5.24027 -0.00429631 5.09224 0.0407059 4.95359C0.0857081 4.81494 0.166293 4.69052 0.274414 4.59276C0.382536 4.49499 0.514412 4.42729 0.656877 4.39642L4.27554 3.61242L6.13888 0.413757Z"
      fill={filled ? "#FFD700" : half ? "url(#half)" : "#E5E7EB"}
    />
    {half && (
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

const FeedbackSlider = ({ feedback }) => {
  const [index, setIndex] = useState(0);
  const cardsToShow = 2;

  const prev = () => setIndex((i) => Math.max(0, i - cardsToShow));
  const next = () =>
    setIndex((i) => Math.min(feedback.length - cardsToShow, i + cardsToShow));

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-4 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-base text-slate-900">
          Clients Feedback
        </span>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-40"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={next}
            disabled={index + cardsToShow >= feedback.length}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-40"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className="flex gap-4 transition-transform duration-500"
        style={{
          transform: `translateX(-${index * (100 / cardsToShow)}%)`,
        }}
      >
        {feedback
          .map((fb, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 min-w-[260px] max-w-[320px] flex-1 flex flex-col gap-2"
              style={{
                transition: "transform 0.5s",
                transform: `translateX(${(idx - index) * 0}%)`,
              }}
            >
              <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                <span>
                  {fb.asker
                    ? `${fb.asker.firstName || ""} ${
                        fb.asker.lastName || ""
                      }`.trim()
                    : `${fb.firstName || ""} ${fb.lastName || ""}`.trim()}
                </span>
                <span>{fb.createdAt}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = fb.rating;
                  if (rating >= i + 1) {
                    return <Star key={i} filled />;
                  } else if (rating > i && rating < i + 1) {
                    return <Star key={i} half />;
                  } else {
                    return <Star key={i} />;
                  }
                })}
                {/* <span className="text-slate-500 ml-1">
                  {fb.rating.toFixed(1)}
                </span> */}
                <span className="text-slate-500 ml-1">
  {(fb.rating ?? 0).toFixed(1)}
</span>
              </div>
              <div className="text-sm text-slate-700">{fb.comment}</div>
            </div>
          ))
          .slice(index, index + cardsToShow)}
      </div>
    </div>
  );
};

export default FeedbackSlider;
