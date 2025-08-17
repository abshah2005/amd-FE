import React, { useRef } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const CategoriesSlider = ({
  categories,
  selectedCategory,
  onSelect,
  className = "",
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-semibold text-gray-800">Top categories</h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <FiArrowLeft size={18} />
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden pb-2 px-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories
        .filter(cat => cat._id !== "All")
        .map((cat) => (
          <div
            key={cat._id}
            className={`min-w-[220px] flex items-center bg-white border rounded-xl px-3 py-3 shadow-sm gap-3 cursor-pointer transition ${
              selectedCategory === cat._id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-500"
            }`}
            onClick={() => onSelect(cat._id)}
          >
            <MdCategory size={22} className="text-gray-400" />
            <span className="flex-1 text-gray-800 text-base">{cat.category}</span>
            <FiArrowRight size={18} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSlider;