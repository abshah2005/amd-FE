import React, { useEffect, useState, useMemo } from "react";
import ToggleSwitch from "./ToggleSwitch";

// Simulate API call for categories/subcategories (replace with real API)
const fetchCategories = () =>
  Promise.resolve([
    {
      _id: "689a2c4ff087f0ff5104e779",
      category: "Design",
      subCategories: [
        "UI/UX",
        "Graphic Design",
        "Product Design",
        "Logo Design",
        "Presentation Design",
      ],
    },
    {
      _id: "689a2bf3f087f0ff5104e76f",
      category: "Business Strategy",
      subCategories: [
        "Startup Consulting",
        "Growth Strategy",
        "Pitch Decks",
        "Market Analysis",
        "Business Planning",
      ],
    },
    // ...other categories
  ]);

const ProfessionalDetailsForm = ({ values, onChange, onNext, loading }) => {
  const [categories, setCategories] = useState([]);

  // Initialize local representation from incoming values
  const [added, setAdded] = useState(
    (values.selectedSpecializations || []).map((s) =>
      typeof s === "string" ? { specialization: s, subCategories: [] } : s
    )
  );

  // Dropdown state
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentSubSelected, setCurrentSubSelected] = useState([]);

  // Tags: use subcategories as tags (max 5). initialize from incoming selectedSpecializations
  const initialTagList = useMemo(() => {
    const subs = (values.selectedSpecializations || []).flatMap((s) =>
      Array.isArray(s.subCategories) ? s.subCategories : []
    );
    return Array.from(new Set(subs)).slice(0, 5);
  }, [values.selectedSpecializations]);

  const [tags, setTags] = useState(initialTagList);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // sync parent when added or tags change
  useEffect(() => {
    // map added entries to expected backend shape: { specialization: id, subCategories: [...] }
    onChange(
      "selectedSpecializations",
      added.map((a) => ({ specialization: a.specialization, subCategories: a.subCategories || [] }))
    );
  }, [added, onChange]);

  useEffect(() => {
    onChange("tags", tags);
  }, [tags, onChange]);

  // helpers
  const categoryById = (id) => categories.find((c) => c._id === id);

  const handleToggleSub = (sub) => {
    setCurrentSubSelected((prev) => {
      if (prev.includes(sub)) return prev.filter((s) => s !== sub);
      return [...prev, sub];
    });
  };

  const canAddCurrent = () => {
    return (
      currentCategoryId &&
      currentSubSelected.length >= 2 &&
      !added.some((a) => String(a.specialization) === String(currentCategoryId))
    );
  };

  const handleAddCurrent = () => {
    if (!canAddCurrent()) return;
    setAdded((prev) => [
      ...prev,
      { specialization: currentCategoryId, subCategories: [...currentSubSelected] },
    ]);

    // merge new subcategories into tags (preserve order, unique, max 5)
    setTags((prevTags) => {
      const newSubs = currentSubSelected.filter((s) => !prevTags.includes(s));
      const merged = [...prevTags, ...newSubs];
      const uniq = Array.from(new Set(merged));
      return uniq.slice(0, 5);
    });

    // clear current selection
    setCurrentCategoryId("");
    setCurrentSubSelected([]);
  };

  const handleRemoveAdded = (specId) => {
    // remove added specialization
    const removed = added.find((a) => String(a.specialization) === String(specId));
    setAdded((prev) => prev.filter((a) => String(a.specialization) !== String(specId)));

    // remove its subcategories from tags (if present)
    if (removed && Array.isArray(removed.subCategories) && removed.subCategories.length) {
      setTags((prevTags) => prevTags.filter((t) => !removed.subCategories.includes(t)));
    }
  };

  // Validation: each added specialization must have at least 2 subcategories
  const categoriesValid = added.every((a) => Array.isArray(a.subCategories) && a.subCategories.length >= 2);

  // Tag helpers
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (
      trimmed &&
      !tags.includes(trimmed) &&
      tags.length < 5 &&
      trimmed.length <= 30
    ) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const removeTagAt = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <form
      className="w-full max-w-2xl bg-white rounded-2xl border p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!categoriesValid) return;
        onNext();
      }}
    >
      {/* inject small css to hide scrollbar but allow horizontal scroll */}
      <style>{`
        .hide-scrollbar { overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold">Professional Details</h2>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you're the right fit.
          </p>
        </div>
        <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
      </div>

      {/* Dropdown approach: Category select + Subcategory checkbox list + Add */}
      <div className="mb-6 flex items-start">
        <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">
          Category and Sub-Category <span className="text-red-500">*</span>
        </label>

        <div className="flex-1 space-y-4">
          <div className="flex gap-3 items-center">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm flex-1"
              value={currentCategoryId}
              onChange={(e) => {
                setCurrentCategoryId(e.target.value);
                setCurrentSubSelected([]);
              }}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.category}
                </option>
              ))}
            </select>

            <div className="flex-1">
              {/* show subcategory picks for current category */}
              {currentCategoryId ? (
                <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                  <div className="text-xs text-gray-500 mb-2">Choose subcategories (min 2)</div>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryById(currentCategoryId)?.subCategories.map((sub) => (
                      <label key={sub} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={currentSubSelected.includes(sub)}
                          onChange={() => handleToggleSub(sub)}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-gray-700">{sub}</span>
                      </label>
                    ))}
                  </div>
                  {currentSubSelected.length < 2 && (
                    <div className="text-red-500 text-xs mt-2">Select at least 2 subcategories to add.</div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-gray-400">Pick a category to see subcategories.</div>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddCurrent}
              disabled={!canAddCurrent()}
              className={`px-4 py-2 rounded ${canAddCurrent() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
              Add
            </button>
          </div>

          {/* Added categories list */}
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-2">Selected categories</div>
            <div className="space-y-3">
              {added.length === 0 && <div className="text-sm text-gray-500">No categories added yet.</div>}
              {added.map((a) => {
                const cat = categoryById(a.specialization) || { category: a.specialization };
                return (
                  <div key={String(a.specialization)} className="border border-gray-200 rounded-md p-3 flex items-start justify-between">
                    <div>
                      <div className="font-medium text-sm">{cat.category}</div>
                      <div className="text-xs text-gray-600 mt-2">
                        {a.subCategories && a.subCategories.length ? (
                          <div className="flex flex-wrap gap-2">
                            {a.subCategories.map((s) => (
                              <span key={s} className="bg-gray-100 px-2 py-1 rounded text-xs">{s}</span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-red-500">No subcategories selected</div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        className="text-sm text-red-500"
                        onClick={() => handleRemoveAdded(a.specialization)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6 flex items-start">
        <label className="w-56 font-medium text-sm text-gray-700 flex-shrink-0 pt-2">Tags <span className="text-red-500">*</span></label>
        <div className="flex-1 min-w-0"> {/* <-- add min-w-0 so the child can shrink and not overflow */}
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            {/* scrollable container: horizontal scroll, no wrap, won't overflow parent */}
            <div
              className="hide-scrollbar whitespace-nowrap"
              style={{
                display: "flex",
                gap: 8,
                padding: "6px 4px",
                alignItems: "center",
                maxWidth: "100%",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {tags.length === 0 && <div className="text-sm text-gray-500">No tags added yet.</div>}
              {tags.map((tag, idx) => (
                <div
                  key={tag}
                  className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border"
                  style={{ flex: "0 0 auto" }}
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={() => removeTagAt(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Range & deliveryTime */}
      <div className="mb-6 grid grid-cols-1 gap-4">
        <div className="flex items-center gap-4">
          <label className="w-56 font-medium text-sm text-gray-700">Indicative Price Range <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-2">
            <input type="number" className="border border-gray-300 rounded-md p-2 w-24 text-sm" placeholder="$20" value={values.priceMin} onChange={(e) => onChange("priceMin", e.target.value)} min={0} />
            <span className="text-gray-400">—</span>
            <input type="number" className="border border-gray-300 rounded-md p-2 w-24 text-sm" placeholder="$100" value={values.priceMax} onChange={(e) => onChange("priceMax", e.target.value)} min={0} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-56 font-medium text-sm text-gray-700">Delivery Time (days)</label>
          <input type="number" value={values.deliveryTime} onChange={(e) => onChange("deliveryTime", e.target.value)} className="border border-gray-300 rounded-md p-2 w-28 text-sm" min={0} />
        </div>
      </div>

      {/* Individual / Firm */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium text-sm text-gray-700 w-56">Individual / Firm</label>
        <ToggleSwitch checked={values.isFirm} onChange={(v) => onChange("isFirm", v)} />
        <input
          type="text"
          className="border border-gray-200 rounded-md p-2 text-sm bg-gray-100"
          placeholder="Firm, College name"
          value={values.firm}
          onChange={(e) => onChange("firm", e.target.value)}
          disabled={!values.isFirm}
        />
      </div>

      {/* Example Questions */}
      <div className="mb-6">
        <label className="font-medium text-sm text-gray-700 block mb-2">
          Example Question <span className="text-xs text-gray-400">(max 5)</span>
        </label>
        <ExampleQuestionInput questions={values.exampleQuestions || []} setQuestions={(qs) => onChange("exampleQuestions", qs)} />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mt-4" disabled={loading || !categoriesValid}>
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
};

// Example Question Input component (unchanged)
const ExampleQuestionInput = ({ questions, setQuestions }) => {
  const [input, setInput] = useState("");
  const addQuestion = () => {
    if (input && !questions.includes(input) && questions.length < 5 && input.length <= 200) {
      setQuestions([...questions, input]);
      setInput("");
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <input className="border border-gray-300 rounded-md p-2 flex-1 text-sm" placeholder="Start typing…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addQuestion()} />
        <button type="button" className={`px-4 py-1 rounded-full text-sm font-semibold transition ${input && questions.length < 5 ? "bg-gray-200 text-gray-500" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`} disabled={!input || questions.length >= 5} onClick={addQuestion}>Add</button>
      </div>
      <div className="mt-2">
        {questions.map((q, idx) => (
          <div key={q} className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-700 flex-1">{idx + 1}. {q}</span>
            <button type="button" className="text-gray-400 hover:text-red-500" onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDetailsForm;