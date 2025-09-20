import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {gridItems} from "../utils/Constant"

const Grid = () => {
  const [chipPosition, setChipPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.target.style.cursor = "grabbing";
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.style.cursor = "grab";
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setChipPosition({
        x: e.clientX - e.target.offsetWidth / 2,
        y: e.clientY - e.target.offsetHeight / 2,
      });
    }
  };

  return (
    <div className="flex flex-col items-center px-4 lg:px-16 py-8">
      {/* Header Section */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6">
        Where questions meet answers — simply and securely
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mb-12">
        A single platform for askers to get clarity and for professionals to
        share knowledge — built to make knowledge accessible to everyone.
      </p>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {gridItems.map((item) => (
          <div
            className={`flex flex-row items-center  rounded-lg p-6 shadow-md ${item.bgColor}`}
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="w-1/2">
              <p className="text-md  mb-2">
                {item.title.split(",")[0]}
                {item.title.includes(",") ? "," : ""}
              </p>
              <h2 className="text-xl font-bold  mb-4">{item.subtitle}</h2>

              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-20%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p>{item.hoverText}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-1/2 flex justify-center">{item.icon}</div>
          </div>
        ))}

      
      </div>

      {/* Draggable Cookie Consent Chip */}
      {/* <div
        className="fixed bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 cursor-grab"
        style={{
          left: `${chipPosition.x}px`,
          top: `${chipPosition.y}px`,
          position: "absolute",
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDrag}
      >
        <p className="text-sm text-gray-600">
          We use cookies to personalize content, run ads, and analyze traffic.
          Read our Cookie Policy.
        </p>
        <button className="bg-gray-200 px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-300">
          Okay
        </button>
      </div> */}
    </div>
  );
};

export default Grid;
