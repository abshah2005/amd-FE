// import React, { useEffect, useState } from "react";

// // Simulate API call for categories/subcategories
// const fetchCategories = () =>
//   Promise.resolve([
//     {
//       id: 1,
//       name: "Artificial Intelligence",
//       subcategories: ["Machine Learning", "Deep Learning", "NLP"],
//     },
//     {
//       id: 2,
//       name: "Design",
//       subcategories: ["Logo Design", "Brochure Design", "Poster Design"],
//     },
//     {
//       id: 3,
//       name: "Business",
//       subcategories: ["Strategy", "Consulting"],
//     },
//     {
//       id: 4,
//       name: "Teaching",
//       subcategories: ["Math", "Science"],
//     },
//     {
//       id: 5,
//       name: "Financial",
//       subcategories: ["Accounting", "Investment"],
//     },
//   ]);

// const ProfessionalDetailsForm = ({
//   values,
//   onChange,
//   onNext,
//   loading,
// }) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(values.category || "");
//   const [selectedSubcategories, setSelectedSubcategories] = useState(values.subcategories || []);
//   const [tags, setTags] = useState(values.tags || []);
//   const [tagInput, setTagInput] = useState("");

//   // For UI panels
//   const [showCategoryPanel, setShowCategoryPanel] = useState(false);
//   const [showSubcategoryPanel, setShowSubcategoryPanel] = useState(false);

//   useEffect(() => {
//     fetchCategories().then(setCategories);
//   }, []);

//   useEffect(() => {
//     onChange("category", selectedCategory);
//     onChange("subcategories", selectedSubcategories);
//   }, [selectedCategory, selectedSubcategories]);

//   useEffect(() => {
//     onChange("tags", tags);
//   }, [tags]);

//   // Get subcategories for selected category
//   const subcategories =
//     categories.find((c) => c.name === selectedCategory)?.subcategories || [];

//   // Tag logic
//   const addTag = () => {
//     if (
//       tagInput &&
//       !tags.includes(tagInput) &&
//       tags.length < 5 &&
//       tagInput.length <= 30
//     ) {
//       setTags([...tags, tagInput]);
//       setTagInput("");
//     }
//   };

//   // Category panel logic
//   const handleCategoryCheck = (catName) => {
//     setSelectedCategory(catName);
//     setSelectedSubcategories([]); // Reset subcategories when category changes
//     setShowCategoryPanel(false);
//     setShowSubcategoryPanel(true);
//   };

//   // Subcategory panel logic
//   const handleSubcategoryCheck = (sub) => {
//     if (selectedSubcategories.includes(sub)) {
//       setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
//     } else {
//       setSelectedSubcategories([...selectedSubcategories, sub]);
//     }
//   };

//   return (
//     <form
//       className="w-full max-w-2xl bg-white rounded-2xl border p-8"
//       onSubmit={e => {
//         e.preventDefault();
//         onNext();
//       }}
//     >
//       <div className="mb-6">
//         <h2 className="text-base font-semibold">Professional Details</h2>
//         <p className="text-xs text-gray-500 mt-1 max-w-xl">
//           Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you’re the right fit.
//         </p>
//         <span className="text-xs text-gray-400 mt-1 float-right">* Mandatory fields</span>
//       </div>
//       {/* Category and Sub-Category */}
//       <div className="mb-6 flex items-start">
//         <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">
//           Category and Sub-Category <span className="text-red-500">*</span>
//         </label>
//         <div className="flex-1">
//           <div className="flex gap-2 mb-2">
//             {/* Category Dropdown */}
//             <button
//               type="button"
//               className="border border-gray-300 rounded-md px-4 py-2 w-48 text-left flex items-center justify-between"
//               onClick={() => {
//                 setShowCategoryPanel((v) => !v);
//                 setShowSubcategoryPanel(false);
//               }}
//             >
//               {selectedCategory || "Category"}
//               <svg
//                 className="ml-2 w-4 h-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M7 10l5 5 5-5"
//                   stroke="#9CA3AF"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             {/* Subcategory Dropdown */}
//             <button
//               type="button"
//               className="border border-gray-300 rounded-md px-4 py-2 w-48 text-left flex items-center justify-between"
//               onClick={() => {
//                 if (selectedCategory) setShowSubcategoryPanel((v) => !v);
//               }}
//               disabled={!selectedCategory}
//             >
//               {selectedSubcategories.length > 0
//                 ? selectedSubcategories.join(", ")
//                 : "Subcategory"}
//               <svg
//                 className="ml-2 w-4 h-4 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M7 10l5 5 5-5"
//                   stroke="#9CA3AF"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             {/* Add button (disabled) */}
//             <button
//               type="button"
//               className="px-5 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
//               disabled
//             >
//               Add
//             </button>
//           </div>
//           {/* Category Panel */}
//           {showCategoryPanel && (
//             <div className="bg-gray-50 border rounded-md p-4 mt-2 grid grid-cols-2 gap-x-8 gap-y-2 max-w-xl">
//               <div className="col-span-2 text-xs text-gray-400 mb-2">
//                 Select up-to one category.
//               </div>
//               {categories.map((cat, idx) => (
//                 <label
//                   key={cat.id}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedCategory === cat.name}
//                     onChange={() => handleCategoryCheck(cat.name)}
//                     className="accent-blue-600"
//                   />
//                   <span>{cat.name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//           {/* Subcategory Panel */}
//           {showSubcategoryPanel && selectedCategory && (
//             <div className="bg-gray-50 border rounded-md p-4 mt-2 max-w-xl">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-medium text-sm">{selectedCategory}</span>
//                 <button
//                   type="button"
//                   className="text-red-500 text-lg"
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setSelectedSubcategories([]);
//                     setShowSubcategoryPanel(false);
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="text-xs text-gray-500 mb-1">Selected sub-categories</div>
//               <div className="flex flex-col gap-2">
//                 {subcategories.map((sub) => (
//                   <label
//                     key={sub}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedSubcategories.includes(sub)}
//                       onChange={() => handleSubcategoryCheck(sub)}
//                       className="accent-blue-600"
//                     />
//                     <span>{sub}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* Selected subcategories summary */}
//           {selectedSubcategories.length > 0 && selectedCategory && !showSubcategoryPanel && (
//             <div className="bg-gray-50 border rounded-md p-3 mt-2 max-w-xl">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-medium text-sm">{selectedCategory}</span>
//                 <button
//                   type="button"
//                   className="text-red-500 text-lg"
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setSelectedSubcategories([]);
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="text-xs text-gray-500 mb-1">Selected sub-categories</div>
//               <div className="flex flex-col gap-2">
//                 {selectedSubcategories.map((sub) => (
//                   <label
//                     key={sub}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked
//                       readOnly
//                       className="accent-blue-600"
//                     />
//                     <span>{sub}</span>
//                     <button
//                       type="button"
//                       className="ml-1 text-gray-400 hover:text-red-500"
//                       onClick={() =>
//                         setSelectedSubcategories(
//                           selectedSubcategories.filter((s) => s !== sub)
//                         )
//                       }
//                     >
//                       ×
//                     </button>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Tags */}
//       <div className="mb-6 flex items-start">
//         <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">
//           Tags <span className="text-red-500">*</span>
//         </label>
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="flex flex-wrap gap-2 flex-1 min-h-[40px] border border-gray-300 rounded-md px-2 py-1">
//               {tags.map((tag, idx) => (
//                 <span
//                   key={tag}
//                   className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm flex items-center"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     className="ml-1 text-gray-400 hover:text-red-500"
//                     onClick={() => setTags(tags.filter((_, i) => i !== idx))}
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//               <input
//                 className="flex-1 outline-none border-none text-sm bg-transparent min-w-[120px]"
//                 placeholder="Add tag"
//                 value={tagInput}
//                 maxLength={30}
//                 onChange={e => setTagInput(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && addTag()}
//                 disabled={tags.length >= 5}
//               />
//             </div>
//           </div>
//           <div className="text-xs text-gray-400 mb-2">5 tags maximum.</div>
//         </div>
//       </div>
//       {/* Price Range */}
//       <div className="mb-6">
//         <label className="font-medium text-sm text-gray-700 block mb-2">
//           Indicative Price Range <span className="text-red-500">*</span>
//         </label>
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             className="border border-gray-300 rounded-md p-2 w-24 text-sm"
//             placeholder="$20"
//             value={values.priceMin}
//             onChange={e => onChange("priceMin", e.target.value)}
//             min={0}
//           />
//           <span className="text-gray-400">—</span>
//           <input
//             type="number"
//             className="border border-gray-300 rounded-md p-2 w-24 text-sm"
//             placeholder="$100"
//             value={values.priceMax}
//             onChange={e => onChange("priceMax", e.target.value)}
//             min={0}
//           />
//         </div>
//       </div>
//       {/* Individual / Firm */}
//       <div className="mb-6 flex items-center gap-4">
//         <label className="font-medium text-sm text-gray-700">
//           Individual / Firm
//         </label>
//         <input
//           type="checkbox"
//           className="accent-blue-600"
//           checked={values.isFirm}
//           onChange={e => onChange("isFirm", e.target.checked)}
//         />
//         <input
//           type="text"
//           className="border border-gray-200 rounded-md p-2 text-sm bg-gray-100"
//           placeholder="Firm, College name"
//           value={values.firm}
//           onChange={e => onChange("firm", e.target.value)}
//           disabled={!values.isFirm}
//         />
//       </div>
//       {/* Example Questions */}
//       <div className="mb-6">
//         <label className="font-medium text-sm text-gray-700 block mb-2">
//           Example Question <span className="text-xs text-gray-400">(max 5)</span>
//         </label>
//         <ExampleQuestionInput
//           questions={values.exampleQuestions || []}
//           setQuestions={qs => onChange("exampleQuestions", qs)}
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mt-4"
//         disabled={loading}
//       >
//         {loading ? "Saving..." : "Save & Continue"}
//       </button>
//     </form>
//   );
// };

// // Example Question Input
// const ExampleQuestionInput = ({ questions, setQuestions }) => {
//   const [input, setInput] = useState("");
//   const addQuestion = () => {
//     if (
//       input &&
//       !questions.includes(input) &&
//       questions.length < 5 &&
//       input.length <= 200
//     ) {
//       setQuestions([...questions, input]);
//       setInput("");
//     }
//   };
//   return (
//     <div>
//       <div className="flex items-center gap-2">
//         <input
//           className="border border-gray-300 rounded-md p-2 flex-1 text-sm"
//           placeholder="Start typing…"
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && addQuestion()}
//         />
//         <button
//           type="button"
//           className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
//             input && questions.length < 5
//               ? "bg-gray-200 text-gray-500"
//               : "bg-gray-200 text-gray-400 cursor-not-allowed"
//           }`}
//           disabled={!input || questions.length >= 5}
//           onClick={addQuestion}
//         >
//           Add
//         </button>
//       </div>
//       <div className="mt-2">
//         {questions.map((q, idx) => (
//           <div key={q} className="flex items-center gap-2 mb-1">
//             <span className="text-sm text-gray-700 flex-1">
//               {idx + 1}. {q}
//             </span>
//             <button
//               type="button"
//               className="text-gray-400 hover:text-red-500"
//               onClick={() =>
//                 setQuestions(questions.filter((_, i) => i !== idx))
//               }
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDetailsForm;




import React, { useEffect, useState } from "react";

// Simulate API call for categories/subcategories
const fetchCategories = () =>
  Promise.resolve([
    {
      id: 1,
      name: "Artificial Intelligence",
      subcategories: ["Machine Learning", "Deep Learning", "NLP"],
    },
    {
      id: 2,
      name: "Design",
      subcategories: ["Logo Design", "Brochure Design", "Poster Design"],
    },
    {
      id: 3,
      name: "Business",
      subcategories: ["Strategy", "Consulting"],
    },
    {
      id: 4,
      name: "Teaching",
      subcategories: ["Math", "Science"],
    },
    {
      id: 5,
      name: "Financial",
      subcategories: ["Accounting", "Investment"],
    },
  ]);

const ProfessionalDetailsForm = ({
  values,
  onChange,
  onNext,
  loading,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(values.category || "");
  const [selectedSubcategories, setSelectedSubcategories] = useState(values.subcategories || []);
  const [tags, setTags] = useState(values.tags || []);
  const [tagInput, setTagInput] = useState("");

  // For UI panels
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [showSubcategoryPanel, setShowSubcategoryPanel] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    onChange("category", selectedCategory);
    onChange("subcategories", selectedSubcategories);
  }, [selectedCategory, selectedSubcategories]);

  useEffect(() => {
    onChange("tags", tags);
  }, [tags]);

  // Get subcategories for selected category
  const subcategories =
    categories.find((c) => c.name === selectedCategory)?.subcategories || [];

  // Tag logic
  const addTag = () => {
    if (
      tagInput &&
      !tags.includes(tagInput) &&
      tags.length < 5 &&
      tagInput.length <= 30
    ) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Category panel logic
  const handleCategoryCheck = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubcategories([]); // Reset subcategories when category changes
    setShowCategoryPanel(false);
    setShowSubcategoryPanel(true);
  };

  // Subcategory panel logic
  const handleSubcategoryCheck = (sub) => {
    if (selectedSubcategories.includes(sub)) {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
    } else {
      setSelectedSubcategories([...selectedSubcategories, sub]);
    }
  };

  return (
    <form
      className="w-full max-w-2xl bg-white rounded-2xl border p-8"
      onSubmit={e => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold">Professional Details</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-xl">
          Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you're the right fit.
        </p>
        <span className="text-xs text-gray-400 mt-1 float-right">* Mandatory fields</span>
      </div>
      
      {/* Category and Sub-Category */}
      <div className="mb-6 flex items-start">
        <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">
          Category and Sub-Category <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="border border-gray-300 rounded-md px-4 py-2 w-32 text-left flex items-center justify-between text-sm bg-white"
                onClick={() => {
                  setShowCategoryPanel((v) => !v);
                  setShowSubcategoryPanel(false);
                }}
              >
                {selectedCategory || "Category"}
                <svg
                  className="ml-2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            
            {/* Subcategory Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="border border-gray-300 rounded-md px-4 py-2 w-40 text-left flex items-center justify-between text-sm bg-white"
                onClick={() => {
                  if (selectedCategory) setShowSubcategoryPanel((v) => !v);
                }}
                disabled={!selectedCategory}
              >
                {selectedSubcategories.length > 0
                  ? "Subcategory"
                  : "Subcategory"}
                <svg
                  className="ml-2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            
            {/* Add button */}
            <button
              type="button"
              className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-500 border border-gray-300"
              disabled
            >
              Add
            </button>
          </div>
          
          {/* Category Panel */}
          {showCategoryPanel && (
            <div className="bg-gray-50 border rounded-md p-4 mt-2 max-w-xl">
              <div className="text-xs text-gray-500 mb-3">
                Select up-to one category.
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat.name}
                      onChange={() => handleCategoryCheck(cat.name)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Subcategory Panel */}
          {showSubcategoryPanel && selectedCategory && (
            <div className="bg-gray-50 border rounded-md p-4 mt-2 max-w-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-sm text-gray-800">{selectedCategory}</span>
                <button
                  type="button"
                  className="text-red-500 text-xl font-light hover:text-red-600"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedSubcategories([]);
                    setShowSubcategoryPanel(false);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="text-xs text-gray-500 mb-2">Selected sub-categories</div>
              <div className="space-y-2">
                {subcategories.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub)}
                      onChange={() => handleSubcategoryCheck(sub)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-gray-700">{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tags */}
      <div className="mb-6 flex items-start">
        <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <div className="border border-gray-300 rounded-md p-3 min-h-[50px] bg-white">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center border"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-red-500 text-lg"
                    onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">5 tags maximum.</div>
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <label className="font-medium text-sm text-gray-700 block mb-2">
          Indicative Price Range <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-24 text-sm"
            placeholder="$20"
            value={values.priceMin}
            onChange={e => onChange("priceMin", e.target.value)}
            min={0}
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-24 text-sm"
            placeholder="$100"
            value={values.priceMax}
            onChange={e => onChange("priceMax", e.target.value)}
            min={0}
          />
        </div>
      </div>
      
      {/* Individual / Firm */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium text-sm text-gray-700">
          Individual / Firm
        </label>
        <input
          type="checkbox"
          className="accent-blue-600"
          checked={values.isFirm}
          onChange={e => onChange("isFirm", e.target.checked)}
        />
        <input
          type="text"
          className="border border-gray-200 rounded-md p-2 text-sm bg-gray-100"
          placeholder="Firm, College name"
          value={values.firm}
          onChange={e => onChange("firm", e.target.value)}
          disabled={!values.isFirm}
        />
      </div>
      
      {/* Example Questions */}
      <div className="mb-6">
        <label className="font-medium text-sm text-gray-700 block mb-2">
          Example Question <span className="text-xs text-gray-400">(max 5)</span>
        </label>
        <ExampleQuestionInput
          questions={values.exampleQuestions || []}
          setQuestions={qs => onChange("exampleQuestions", qs)}
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
};

// Example Question Input component remains the same
const ExampleQuestionInput = ({ questions, setQuestions }) => {
  const [input, setInput] = useState("");
  const addQuestion = () => {
    if (
      input &&
      !questions.includes(input) &&
      questions.length < 5 &&
      input.length <= 200
    ) {
      setQuestions([...questions, input]);
      setInput("");
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 text-sm"
          placeholder="Start typing…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addQuestion()}
        />
        <button
          type="button"
          className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
            input && questions.length < 5
              ? "bg-gray-200 text-gray-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!input || questions.length >= 5}
          onClick={addQuestion}
        >
          Add
        </button>
      </div>
      <div className="mt-2">
        {questions.map((q, idx) => (
          <div key={q} className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-700 flex-1">
              {idx + 1}. {q}
            </span>
            <button
              type="button"
              className="text-gray-400 hover:text-red-500"
              onClick={() =>
                setQuestions(questions.filter((_, i) => i !== idx))
              }
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDetailsForm;