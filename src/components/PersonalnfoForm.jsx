import React, { useState } from "react";
import { allLanguages, allLocations } from "../utils/Constant";

// Custom input with add button for multi-value fields
const MultiAddInput = ({
  label,
  placeholder,
  options,
  onAdd,
  items,
  disabled,
}) => {
  const [input, setInput] = useState("");
  const showArrow = options && options.length > 0;

  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <input
          className={`border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 pr-8 ${
            showArrow ? "appearance-none" : ""
          }`}
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          list={showArrow ? `${label}-options` : undefined}
        />
        {showArrow && (
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
        {showArrow && (
          <datalist id={`${label}-options`}>
            {options.map(opt => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        )}
      </div>
      <button
        type="button"
        className={`px-5 py-1 rounded-full text-sm font-semibold transition ${
          input && !disabled
            ? "bg-gray-200 text-gray-500"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!input || disabled}
        onClick={() => {
          if (input && !items.includes(input)) {
            onAdd(input);
            setInput("");
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

const PersonalInfoForm = ({
  values,
  onChange,
  onImageChange,
  onNext,
  loading,
}) => {
  
  // Validation for mandatory fields
  const isValid =
    values.profileImage || values.profileImageFile
    && values.firstName?.trim()
    && values.lastName?.trim()
    && values.description?.trim()?.length > 0
    && Array.isArray(values.languages) && values.languages.length > 0
    && Array.isArray(values.locations) && values.locations.length > 0;

  return (
    <form
      className="w-full max-w-2xl bg-white rounded-2xl border p-8"
      onSubmit={e => {
        e.preventDefault();
        if (isValid) onNext();
      }}
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold">Personal Information</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-xs">
          Tell us a bit about yourself. This information helps askers better understand who you are and builds confidence in your expertise.
        </p>
        <span className="text-xs text-gray-400 mt-1 float-right">* Mandatory fields</span>
      </div>
      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0">
          Profile Picture <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            {values.profileImage ? (
              <img
                src={values.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              values.firstName?.[0]?.toUpperCase() || "J"
            )}
          </div>
          <label className="cursor-pointer flex flex-col items-center">
            <span className="border border-gray-300 rounded-md px-4 py-1 mt-2 flex items-center gap-2 text-gray-700 text-sm font-medium">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M12 16v-4M12 12V8M12 12h4M12 12H8" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="#4B5563" strokeWidth="1.5"/>
              </svg>
              Upload
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageChange}
            />
          </label>
        </div>
      </div>
      {/* Full Name */}
      <div className="flex items-center mb-6">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 flex-1 text-sm"
            placeholder="First Name"
            value={values.firstName}
            onChange={e => onChange("firstName", e.target.value)}
            required
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 flex-1 text-sm"
            placeholder="Last Name"
            value={values.lastName}
            onChange={e => onChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>
      {/* Description */}
      <div className="flex items-start mb-6">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0 pt-1">
          Description <span className="text-red-500">*</span>
        </label>
        <div className="w-full">
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            placeholder="Share a bit about your work experience — including your background, areas of expertise, and any notable roles you’ve held."
            value={values.description}
            onChange={e => onChange("description", e.target.value)}
            minLength={50}
            required
            rows={4}
          />
          <div className="text-xs text-gray-400 mt-1">min. 150 characters</div>
        </div>
      </div>
      {/* Languages */}
      <div className="flex items-center mb-4">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0">
          Languages <span className="text-red-500">*</span>
        </label>
        <div className="w-full">
          <MultiAddInput
            label="Language"
            placeholder="Language"
            options={allLanguages}
            onAdd={lang => onChange("languages", [...(values.languages || []), lang])}
            items={values.languages || []}
            disabled={false}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(values.languages || []).map((lang, idx) => (
              <span
                key={lang}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center"
              >
                {lang}
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-red-500"
                  onClick={() =>
                    onChange(
                      "languages",
                      values.languages.filter((l, i) => i !== idx)
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Location */}
      <div className="flex items-center mb-4">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0">
          Location <span className="text-red-500">*</span>
        </label>
        <div className="w-full">
          <MultiAddInput
            label="Country"
            placeholder="Country"
            options={allLocations}
            onAdd={country => onChange("locations", [...(values.locations || []), country])}
            items={values.locations || []}
            disabled={false}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(values.locations || []).map((loc, idx) => (
              <span
                key={loc}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center"
              >
                {loc}
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-red-500"
                  onClick={() =>
                    onChange(
                      "locations",
                      values.locations.filter((l, i) => i !== idx)
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Save & Continue Button */}
      <button
        type="submit"
        className={`bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mt-4 ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!isValid || loading}
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
};

export default PersonalInfoForm;