import React, { useState } from "react";

const PricingInput = ({ initialMode = "normal", status, priceRange = "$25-$35" }) => {
  const [mode, setMode] = useState(initialMode);
  const [price, setPrice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEditable = status === "approved";
  const isDisabled = !isEditable;

  const toggleMode = (newMode) => {
    if (isEditable) {
      setMode(newMode);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDoneClick = () => {
    if (price) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-48  rounded-lg shadow-md p-4 bg-gray-200">
      {/* Mode Selection */}
      <div className="flex justify-between mb-4">
        <button
          className={`flex-1 flex flex-col items-center justify-center p-2 rounded ${
            mode === "normal" ? "bg-white" : "bg-gray-200"
          }`}
          onClick={() => toggleMode("normal")}
          disabled={!isEditable}
        >
          <svg
            className={`w-5 h-5 mb-1 ${mode === "normal" ? "text-gray-500" : "text-gray-300"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`text-xs ${mode === "normal" ? "text-gray-700" : "text-gray-400"}`}>
            Normal
          </span>
        </button>
        <button
          className={`flex-1 flex flex-col items-center justify-center p-2 rounded ${
            mode === "fast" ? "bg-white" : "bg-gray-200"
          }`}
          onClick={() => toggleMode("fast")}
          disabled={!isEditable}
        >
          <svg
            className={`w-5 h-5 mb-1 ${mode === "fast" ? "text-yellow-500" : "text-gray-300"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className={`text-xs ${mode === "fast" ? "text-yellow-600" : "text-gray-400"}`}>
            Fast
          </span>
        </button>
      </div>

      {/* Price Input */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-1">Quote a price</p>
        {isSubmitted ? (
          <p className="text-xl font-bold text-gray-800">${price}</p>
        ) : isDisabled ? (
          <p className="text-xl font-bold text-gray-500">{priceRange}</p>
        ) : (
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="text-xl font-bold text-gray-500 border bg-gray-200 rounded w-full text-center"
            placeholder="Enter price"
          />
        )}
        <button
          className={`w-full py-2 mt-3  rounded-full font-medium ${
            isDisabled || isSubmitted
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={isDisabled || isSubmitted || !price}
          onClick={handleDoneClick}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PricingInput;