import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProcessSteps from "./ProcessSteps";
import AskerSteps from "./AskerSteps";
import image from "../assets/sideimg.png";

const InfoSection = ({selectedTab="professionals"}) => {
  const [activeTab, setActiveTab] = useState(selectedTab || "professionals");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const fadeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 } 
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 } 
    },
  };

  return (
    <div className="flex flex-col md:flex-row  p-10 gap-8">
      <div className="w-full md:w-[60%] top-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          More than just a marketplace!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          With AskMeDirect, professionals don't just wait for questions 
          they take control of monetization by sharing their unique 
          profile links with their own audience. Students, clients, 
          followers — anyone can reach them directly, all through one 
          platform.
        </p>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => handleTabSwitch("professionals")}
            className={`rounded-full px-6 py-2 border ${
              activeTab === "professionals"
                ? "bg-[#D7EDFF] text-[#086BFF] border-blue-500"
                : "bg-white text-gray-600 border-gray-300"
            } transition-colors duration-300 flex items-center`}
          >
            <span className={`w-3 h-3 rounded-full mr-2 ${activeTab === "professionals" ? "bg-blue-400" : "bg-gray-400"}`}></span>
            Professional
          </button>
          <button
            onClick={() => handleTabSwitch("askers")}
            className={`rounded-full px-6 py-2 border ${
              activeTab === "askers"
                ? "bg-[#D7EDFF] text-[#086BFF] border-blue-500"
                : "bg-white text-gray-600 border-gray-300"
            } transition-colors duration-300 flex items-center`}
          >
            <span className={`w-3 h-3 rounded-full mr-2 ${activeTab === "askers" ? "bg-[#086BFF]" : "bg-gray-400"}`}></span>
            Asker
          </button>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>

      <div className="w-full md:w-[40%]">
        <AnimatePresence mode="wait">
          {activeTab === "professionals" ? (
            <motion.div
              key="professional"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ProcessSteps />
            </motion.div>
          ) : (
            <motion.div
              key="asker"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AskerSteps />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InfoSection;