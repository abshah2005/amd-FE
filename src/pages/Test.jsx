import React, { useState } from "react";
import MainNav from "../components/MainNav";
import Banner from "../components/Banner";
import CategoriesSlider from "../components/Categories";
import Professionals from "../components/Professionals";

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

const Test = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <Banner />

      <div className="flex flex-col m-auto items-center justify-center py-4 w-[90%]">
        <div className="w-full">
          <Professionals />
        </div>
      </div>
    </div>
  );
};

export default Test;
