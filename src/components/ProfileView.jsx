import React, { useState, useEffect, memo, useRef } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";
import useUpdateProfile from "../hooks/userhooks";
import useSpecializations from "../hooks/useSpecializations";

const languageOptions = [
  "English",
  "Spanish",
  "Chinese",
  "German",
  "French",
  "Urdu",
  "Hindi",
  "Arabic",
];
const locationOptions = [
  "USA",
  "UK",
  "Germany",
  "France",
  "Spain",
  "Pakistan",
  "India",
  "UAE",
];

const DefaultView = memo(
  ({
    formData,
    handleInputChange,
    editing,
    setEditing,
    user,
    avatarInitial,
    handleSaveChanges,
    handleCancelEdit,
    handleFileChange,
    fileInputRef,
    isUpdating,
    selectedFile, // <-- add this prop
  }) => (
    <div className="w-full">
      <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
        {/* header title + edit icon */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold">Personal Information</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Tell us a bit about yourself. This information helps askers better
              understand who you are and builds confidence in your expertise.
            </p>
          </div>

          <div className="text-right">
            {editing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  aria-label="Cancel edit"
                  className="inline-flex items-center justify-center px-3 py-1 rounded text-sm border border-gray-200"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  aria-label="Save changes"
                  className="inline-flex items-center justify-center px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-600"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                aria-label="Edit profile"
                className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
              >
                <Edit />
              </button>
            )}
            <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
          </div>
        </div>

        {/* main content: picture centered and name fields */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* left column: label (keeps spacing like design) */}
          <div className="md:col-span-1">
            <div className="text-sm text-gray-700 font-medium mb-6">
              Profile Picture
            </div>
          </div>

          {/* middle: avatar */}
          <div className="flex flex-col items-center justify-center md:justify-center">
            {editing && selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                {avatarInitial}
              </div>
            )}

            {editing && (
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 text-sm text-gray-700"
                onClick={() => fileInputRef.current.click()}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12M8 7l4-4 4 4M21 21H3"
                  />
                </svg>
                Upload
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div>
          {/* right: inputs */}
          <div className="md:col-span-1">
            <div className="flex gap-3 mt-2 items-center">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 font-medium mb-3">
                  First Name
                </label>
                <input
                  name="firstName"
                  className={`w-full text-sm rounded border p-2 ${
                    editing ? "bg-white" : "bg-gray-100 text-gray-600"
                  } border-gray-200`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
                
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-700 font-medium mb-3">
                  Last Name
                </label>
                <input
                  name="lastName"
                  className={`w-full text-sm rounded border p-2 ${
                    editing ? "bg-white" : "bg-gray-100 text-gray-600"
                  } border-gray-200`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

const PersonalInfoBox = ({
  user,
  avatarInitial,
  editing,
  formData,
  fileInputRef,
  handleFileChange,
  setFormData,
  selectedFile,
}) => {
  const [langInput, setLangInput] = useState("");
  const [locInput, setLocInput] = useState("");

  const addItem = (field, value, resetFn) => {
    if (!value) return;
    const prev = Array.isArray(formData[field]) ? [...formData[field]] : [];
    if (prev.includes(value)) {
      resetFn("");
      return;
    }
    const next = [...prev, value];
    setFormData((prevState) => ({ ...prevState, [field]: next }));
    console.log({ field, old: prev, new: next });
    resetFn("");
  };

  const removeItem = (field, idx) => {
    const prev = Array.isArray(formData[field]) ? [...formData[field]] : [];
    const next = prev.filter((_, i) => i !== idx);
    setFormData((prevState) => ({ ...prevState, [field]: next }));
    console.log({ field, old: prev, new: next });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
      <h3 className="text-base font-semibold mb-2">Personal Information</h3>
      <p className="text-xs text-gray-500 mb-4">
        Tell us a bit about yourself. This information helps askers better
        understand who you are and builds confidence in your expertise.
      </p>

      {/* <div className="flex flex-col items-center mb-6">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
            {avatarInitial}
          </div>
        )}
      </div> */}
      <div className="flex flex-col items-center mb-6">
        {editing && selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
            {avatarInitial}
          </div>
        )}

        {editing && (
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 text-sm text-gray-700"
            onClick={() => fileInputRef.current.click()}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12M8 7l4-4 4 4M21 21H3"
              />
            </svg>
            Upload New Picture
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="mb-4">
        {editing ? (
          <div className="flex gap-3">
            <div className="flex flex-col w-full">
              <label className="">First Name</label>
              <input
                name="firstName"
                value={formData.firstName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value.replace(/\s/g, ""),
                  }))
                }
                className="w-full text-sm rounded border p-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="">Last Name</label>

              <input
                name="lastName"
                value={formData.lastName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value.replace(/\s/g, "") }))
                }
                className="w-full text-sm rounded border p-2"
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex flex-col w-full">
              <label className="block text-sm text-gray-700 font-medium mb-3">First Name</label>
              <input
                type="text"
                className="w-full text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
                value={user?.firstName || ""}
                disabled
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-sm text-gray-700 font-medium mb-3">Last Name</label>
              <input
                type="text"
                className="w-full text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
                value={user?.lastName || ""}
                disabled
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Description
        </label>
        {editing ? (
          <textarea
            value={formData.description || user?.professional?.about?.[0] || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
          />
        ) : (
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full text-sm bg-gray-100 text-gray-600"
            value={user?.professional?.about?.[0] || ""}
            rows={3}
            disabled
          />
        )}
        <div className="text-xs text-gray-400 mt-1">min. 50 characters</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Languages
        </label>
        {editing ? (
          <>
            <div className="flex gap-2 mb-2">
              <select
                className="border rounded p-2 text-sm"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
              >
                <option value="">Select language</option>
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <input
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                placeholder="Add language"
                className="flex-1 border rounded p-2 text-sm"
              />
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-200 text-sm"
                onClick={() =>
                  addItem("languages", langInput.trim(), setLangInput)
                }
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.languages || user?.professional?.languages || []).map(
                (lang, idx) => (
                  <span
                    key={lang + idx}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center"
                  >
                    {lang}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-500"
                      onClick={() => removeItem("languages", idx)}
                      disabled={!editing}
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(user?.professional?.languages || []).map((lang, idx) => (
              <span
                key={lang + idx}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Location
        </label>
        {editing ? (
          <>
            <div className="flex gap-2 mb-2">
              <select
                className="border rounded p-2 text-sm"
                value={locInput}
                onChange={(e) => setLocInput(e.target.value)}
              >
                <option value="">Select location</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <input
                value={locInput}
                onChange={(e) => setLocInput(e.target.value)}
                placeholder="Add location"
                className="flex-1 border rounded p-2 text-sm"
              />
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-200 text-sm"
                onClick={() =>
                  addItem("locations", locInput.trim(), setLocInput)
                }
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.locations || user?.professional?.country || []).map(
                (loc, idx) => (
                  <span
                    key={loc + idx}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center"
                  >
                    {loc}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-500"
                      onClick={() => removeItem("locations", idx)}
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(user?.professional?.country || []).map((loc, idx) => (
              <span
                key={loc + idx}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
              >
                {loc}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfessionalInfoBox = ({
  user,
  avatarInitial,
  editing = false,
  formData = {},
  setFormData = () => {},
}) => {
  const prof = user?.professional || {};
  const { specializations: categories = [], loading: specsLoading } =
    useSpecializations();
  const [openTags, setOpenTags] = useState(true);
  const [added, setAdded] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentSubSelected, setCurrentSubSelected] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  // Prepopulate from profile on mount
  useEffect(() => {
    if (
      prof.selectedSpecializations &&
      prof.selectedSpecializations.length > 0
    ) {
      setAdded(
        prof.selectedSpecializations.map((s) =>
          typeof s === "string"
            ? { specialization: s, subCategories: [] }
            : {
                specialization: s.specialization,
                subCategories: Array.isArray(s.subCategories)
                  ? s.subCategories
                  : [],
              }
        )
      );
      // Also prepopulate tags from subcategories
      const subs = prof.selectedSpecializations.flatMap((s) =>
        Array.isArray(s.subCategories) ? s.subCategories : []
      );
      setTags(Array.from(new Set(subs)));
    }
  }, [prof.selectedSpecializations]);

  // Sync tags to formData.tags
  useEffect(() => {
    setFormData((prev) => ({ ...prev, tags }));
  }, [tags, setFormData]);

  // Sync added to formData.selectedSpecializations
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedSpecializations: added.map((a) => ({
        specialization: a.specialization,
        subCategories: a.subCategories || [],
      })),
    }));
  }, [added, setFormData]);

  // Helpers
  const categoryById = (id) => categories.find((c) => c._id === id);

  const handleToggleSub = (sub) => {
    setCurrentSubSelected((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const canAddCurrent = () =>
    currentCategoryId &&
    currentSubSelected.length >= 2 &&
    !added.some((a) => String(a.specialization) === String(currentCategoryId));

  const handleAddCurrent = () => {
    if (!canAddCurrent()) return;
    setAdded((prev) => [
      ...prev,
      {
        specialization: currentCategoryId,
        subCategories: [...currentSubSelected],
      },
    ]);
    setTags((prevTags) => {
      const newSubs = currentSubSelected.filter((s) => !prevTags.includes(s));
      return Array.from(new Set([...prevTags, ...newSubs]));
    });
    setCurrentCategoryId("");
    setCurrentSubSelected([]);
  };

  const handleRemoveTag = (tag) => {
    // Remove tag from tags state
    setTags((prevTags) => prevTags.filter((t) => t !== tag));

    // Remove tag from subcategories in added state
    setAdded(
      (prevAdded) =>
        prevAdded
          .map((item) => ({
            ...item,
            subCategories: item.subCategories.filter((sub) => sub !== tag),
          }))
          .filter((item) => item.subCategories.length > 0) // Remove categories with no subcategories
    );
  };

  const handleRemoveAdded = (specId) => {
    const removed = added.find(
      (a) => String(a.specialization) === String(specId)
    );
    setAdded((prev) =>
      prev.filter((a) => String(a.specialization) !== String(specId))
    );
    if (removed && Array.isArray(removed.subCategories)) {
      setTags((prevTags) =>
        prevTags.filter((t) => !removed.subCategories.includes(t))
      );
    }
  };

  // Handler to remove a subcategory from a category
  const handleRemoveSubCat = (specId, sub) => {
    setAdded((prev) =>
      prev
        .map((item) =>
          item.specialization === specId
            ? {
                ...item,
                subCategories: item.subCategories.filter((s) => s !== sub),
              }
            : item
        )
        .filter((item) => item.subCategories.length > 0)
    );
    setTags((prevTags) => prevTags.filter((t) => t !== sub));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
      <h3 className="text-base font-semibold mb-2">Professional Details</h3>
      <p className="text-xs text-gray-500 mb-4">
        Highlight your expertise. Share your background, qualifications, and
        areas of knowledge so askers know why you’re the right fit.
      </p>

      {/* --- Inserted Category/Subcategory UI --- */}
      <div className="mb-4">
        <label className="font-medium text-sm text-gray-700 block mb-2">
          Select up-to one category.
        </label>
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded">
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={currentCategoryId === cat._id}
                onChange={() => {
                  setCurrentCategoryId(cat._id);
                  setCurrentSubSelected([]);
                }}
                // disabled={
                //   added.some((a) => a.specialization === cat._id) ||
                //   (currentCategoryId && currentCategoryId !== cat._id)
                // }
                disabled={
                  !editing || // Disable if editing is false
                  added.some((a) => a.specialization === cat._id) ||
                  (currentCategoryId && currentCategoryId !== cat._id)
                }
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-700">{cat.category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategories for selected category */}
      {currentCategoryId &&
        !added.some((a) => a.specialization === currentCategoryId) && (
          <div className="border border-gray-200 rounded-md p-2 bg-gray-50 mb-4">
            <div className="text-xs text-gray-500 mb-2">
              Choose subcategories (min 2)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoryById(currentCategoryId)?.subCategories.map((sub) => (
                <label key={sub} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={currentSubSelected.includes(sub)}
                    onChange={() => handleToggleSub(sub)}
                    className="w-4 h-4 accent-blue-600"
                    disabled={!editing}
                  />
                  <span className="text-gray-700">{sub}</span>
                </label>
              ))}
            </div>
            {currentSubSelected.length < 2 && (
              <div className="text-red-500 text-xs mt-2">
                Select at least 2 subcategories to add.
              </div>
            )}
            {/* { !editing ? &&()} */}
            {editing && (
              <button
                type="button"
                onClick={handleAddCurrent}
                disabled={!canAddCurrent()}
                className={`mt-2 px-4 py-2 rounded ${
                  canAddCurrent()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            )}
          </div>
        )}

      {/* Selected categories and subcategories */}
      {/* <div className="mt-2">
        <div className="text-xs text-gray-500 mb-2">Selected categories</div>
        <div className="space-y-3">
          {added.length === 0 && (
            <div className="text-sm text-gray-500">
              No categories added yet.
            </div>
          )}
          {added.map((a) => {
            const cat = categoryById(a.specialization) || {
              category: a.specialization,
            };
            return (
              <div
                key={String(a.specialization)}
                className="border border-gray-200 rounded-md p-3 flex items-start justify-between"
              >
                <div>
                  <div className="font-medium text-sm">{cat.category}</div>
                  <div className="text-xs text-gray-600 mt-2">
                    {a.subCategories && a.subCategories.length ? (
                      <div className="flex flex-wrap gap-2">
                        {a.subCategories.map((s) => (
                          <span
                            key={s}
                            className="bg-gray-100 px-2 py-1 rounded text-xs inline-flex items-center"
                          >
                            {s}
                            <button
                              type="button"
                              className="ml-1 text-gray-400 hover:text-red-500"
                              style={{ fontSize: "12px", lineHeight: "1" }}
                              onClick={() =>
                                handleRemoveSubCat(a.specialization, s)
                              }
                              aria-label={`Remove ${s}`}
                              disabled={!editing}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-red-500">
                        No subcategories selected
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => handleRemoveAdded(a.specialization)}
                    disabled={!editing}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-2">Selected categories</div>
        <div className="space-y-3">
          {added.length === 0 && (
            <div className="text-sm text-gray-500">
              No categories added yet.
            </div>
          )}
          {added.map((a) => {
            const cat = categoryById(a.specialization) || {
              category: a.specialization,
            };
            return (
              <div
                key={String(a.specialization)}
                className="border border-gray-200 rounded-md p-3 flex items-start justify-between"
              >
                <div>
                  <div className="font-medium text-sm">{cat.category}</div>
                  <div className="text-xs text-gray-600 mt-2">
                    {a.subCategories && a.subCategories.length ? (
                      <div className="flex flex-wrap gap-2">
                        {a.subCategories.map((s) => (
                          <span
                            key={s}
                            className="bg-gray-100 px-2 py-1 rounded text-xs inline-flex items-center"
                          >
                            {s}
                            <button
                              type="button"
                              className="ml-1 text-gray-400 hover:text-red-500"
                              style={{ fontSize: "12px", lineHeight: "1" }}
                              onClick={() =>
                                handleRemoveSubCat(a.specialization, s)
                              }
                              aria-label={`Remove ${s}`}
                              disabled={!editing}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-red-500">
                        No subcategories selected
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => handleRemoveAdded(a.specialization)}
                    disabled={!editing}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Tags
        </label>
        <div className="border rounded bg-gray-50 p-3">
          <button
            type="button"
            className="flex items-center gap-2 text-sm mb-2"
            onClick={() => setOpenTags((o) => !o)}
            disabled={!editing}
          ></button>
          {openTags && (
            <>
              {editing && (
                <div className="flex gap-2 mt-2">
                  <input
                    placeholder="Add custom tag"
                    className="flex-1 border rounded p-2 text-sm"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    disabled={(formData.tags || []).length >= 5} // Disable input if 5 tags are already added
                  />
                  <button
                    type="button"
                    className="px-4 py-1 rounded bg-gray-200 text-sm"
                    onClick={() => {
                      const v = newTag.trim();
                      if (!v) return;
                      const prev = Array.isArray(formData.tags)
                        ? [...formData.tags]
                        : prof.tags || [];
                      if (prev.includes(v)) {
                        setNewTag("");
                        return;
                      }
                      if (prev.length >= 5) {
                        alert("You can only add up to 5 tags.");
                        return;
                      }
                      const next = [...prev, v];
                      setFormData((p) => ({ ...p, tags: next }));
                      setNewTag("");
                    }}
                    disabled={(formData.tags || []).length >= 5} // Disable button if 5 tags are already added
                  >
                    Add
                  </button>
                </div>
              )}
              {/* Selected tags panel */}
              {/* <div className="mt-2 flex flex-wrap gap-2">
          {(formData.tags || []).map((tag, idx) => (
            <span
              key={tag + idx}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs flex items-center border border-blue-300"
            >
              {tag}
              {editing && (
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-red-500"
                  onClick={() => {
                    const next = (formData.tags || []).filter(
                      (_, i) => i !== idx
                    );
                    setFormData((p) => ({ ...p, tags: next }));
                  }}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div> */}
              <div className="mt-2 flex flex-wrap gap-2">
                {(formData.tags || []).map((tag, idx) => (
                  <span
                    key={tag + idx}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs flex items-center border border-blue-300"
                  >
                    {tag}
                    {editing && (
                      <button
                        type="button"
                        className="ml-1 text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {/* Warning message if tags exceed 5 */}
              {(formData.tags || []).length > 5 && (
                <div className="text-red-500 text-sm mt-2">
                  You cannot proceed with more than 5 tags.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* other fields (price, entity, example questions) unchanged */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Indicative Price Range
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={formData.priceRangeLow ?? prof.priceRangeLow ?? ""}
            disabled={!editing}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priceRangeLow: e.target.value,
              }))
            }
            className={`w-1/3 text-sm rounded border p-2 ${
              editing ? "" : "bg-gray-100 text-gray-600"
            }`}
          />
          <span className="mx-2 text-gray-500">—</span>
          <input
            type="number"
            value={formData.priceRangeHigh ?? prof.priceRangeHigh ?? ""}
            disabled={!editing}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priceRangeHigh: e.target.value,
              }))
            }
            className={`w-1/3 text-sm rounded border p-2 ${
              editing ? "" : "bg-gray-100 text-gray-600"
            }`}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Individual / Firm
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="entityType"
              value="individual"
              disabled={!editing}
              checked={
                (formData.entityType ?? prof.entityType ?? "individual") ===
                "individual"
              }
              onChange={() =>
                setFormData((prev) => ({ ...prev, entityType: "individual" }))
              }
            />
            <span className="text-sm">Individual</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="entityType"
              value="firm"
              disabled={!editing}
              checked={(formData.entityType ?? prof.entityType) === "firm"}
              onChange={() =>
                setFormData((prev) => ({ ...prev, entityType: "firm" }))
              }
            />
            <span className="text-sm">Firm</span>
          </label>
          {(formData.entityType ?? prof.entityType) === "firm" && (
            <input
              placeholder="Firm name"
              value={formData.firmName ?? prof.firmName ?? ""}
              disabled={!editing}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firmName: e.target.value }))
              }
              className="ml-4 text-sm rounded border p-2"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Example Questions
        </label>
        <ul className="list-decimal ml-6 mb-2">
          {(formData.exampleQuestions && formData.exampleQuestions.length > 0
            ? formData.exampleQuestions
            : prof.exampleQuestions || []
          ).map((q, idx) => (
            <li key={idx} className="text-sm text-gray-700 mb-1">
              {q}
            </li>
          ))}
        </ul>
        {editing && (
          <div className="flex gap-2">
            <input
              placeholder="Add example question"
              className="flex-1 border rounded p-2 text-sm"
              value={formData._newExample || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  _newExample: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-200 text-sm"
              onClick={() => {
                const v = (formData._newExample || "").trim();
                if (!v) return;
                const prev = Array.isArray(formData.exampleQuestions)
                  ? [...formData.exampleQuestions]
                  : prof.exampleQuestions || [];
                const next = [...prev, v];
                setFormData((prev) => ({
                  ...prev,
                  exampleQuestions: next,
                  _newExample: "",
                }));
                console.log({
                  field: "exampleQuestions",
                  old: prev,
                  new: next,
                });
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Profesional Experiences
        </label>
        <ul className="list-decimal ml-6 mb-2">
          {(formData.professionalExperiences &&
          formData.professionalExperiences.length > 0
            ? formData.professionalExperiences
            : prof.professionalExperiences || []
          ).map((q, idx) => (
            <li key={idx} className="text-sm text-gray-700 mb-1">
              {q}
            </li>
          ))}
        </ul>
        {editing && (
          <div className="flex gap-2">
            <input
              placeholder="Add Professional Experience"
              className="flex-1 border rounded p-2 text-sm"
              value={formData._newProfessionalExperience || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  _newProfessionalExperience: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-200 text-sm"
              onClick={() => {
                const v = (formData._newProfessionalExperience || "").trim();
                if (!v) return;
                const prev = Array.isArray(formData.professionalExperiences)
                  ? [...formData.professionalExperiences]
                  : prof.professionalExperiences || [];
                const next = [...prev, v];
                setFormData((prev) => ({
                  ...prev,
                  professionalExperiences: next,
                  _newProfessionalExperience: "",
                }));
                console.log({
                  field: "professionalExperiences",
                  old: prev,
                  new: next,
                });
              }}
            >
              Add
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

const ProfessionalView = memo(
  ({
    formData,
    handleInputChange,
    editing,
    setEditing,
    setFormData,
    avatarInitial,
    user,
    handleSaveChanges,
    handleCancelEdit,
    handleFileChange,
    fileInputRef,
    isUpdating,
    selectedFile,
  }) => {
    const prof = user?.professional || {};
    return (
      <div className="">
        <div className="relative bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <div className="flex justify-end mb-4">
            <div className="text-right">
              {editing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    aria-label="Cancel edit"
                    className="inline-flex items-center justify-center px-3 py-1 rounded text-sm border border-gray-200"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    aria-label="Save changes"
                    className="inline-flex items-center justify-center px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  aria-label="Edit profile"
                  className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
                >
                  <Edit />
                </button>
              )}
              <div className="text-xs text-gray-400 mt-1">
                * Mandatory fields
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="w-full">
              <PersonalInfoBox
                user={user}
                fileInputRef={fileInputRef}
                avatarInitial={avatarInitial}
                editing={editing}
                formData={formData}
                handleFileChange={handleFileChange}
                setFormData={setFormData}
                selectedFile={selectedFile}
              />
            </div>
            <div className="w-full">
              <ProfessionalInfoBox
                user={user}
                avatarInitial={avatarInitial}
                editing={editing}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const ProfileView = () => {
  const { user, refreshCurrentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    professionalExperiences: [],
    languages: [],
    locations: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Setup the update profile mutation
  const updateProfile = useUpdateProfile({
    onSuccess: async () => {
      setEditing(false);
      await refreshCurrentUser();
    },
  });

  // Initialize form from user when available
  useEffect(() => {
    if (!user) return;

    // Base fields
    const base = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    };

    // If professional, include professional-specific fields
    if (user.activeRole === "professional") {
      setFormData({
        ...base,
        description: user.professional?.about?.[0] || "",
        // prefer arrays, fallback to empty arrays
        languages: Array.isArray(user.professional?.languages)
          ? [...user.professional.languages]
          : [],
        locations: Array.isArray(user.professional?.country)
          ? [...user.professional.country]
          : [],
      });
    } else {
      // asker/admin flow (unchanged)
      setFormData(base);
    }
  }, [user]);

  // Handle input changes with a single handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ""), 
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSaveChanges = () => {
    // Professional update: include professional fields
    if (user?.activeRole === "professional") {
      const fd = new FormData();
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("description", formData.description || "");
      // send arrays/objects as JSON strings (backend should parse accordingly)
      fd.append("languages", JSON.stringify(formData.languages || []));
      fd.append("locations", JSON.stringify(formData.locations || []));
      // professional specific fields
      fd.append(
        "tags",
        JSON.stringify(formData.tags ?? user?.professional?.tags ?? [])
      );
      fd.append(
        "selectedSpecializations",
        JSON.stringify(
          formData.selectedSpecializations ??
            (user?.professional?.selectedSpecializations || []).map(
              (s) => s.specialization
            )
        )
      );
      fd.append(
        "priceRangeLow",
        formData.priceRangeLow ?? user?.professional?.priceRangeLow ?? ""
      );
      fd.append(
        "priceRangeHigh",
        formData.priceRangeHigh ?? user?.professional?.priceRangeHigh ?? ""
      );
      fd.append(
        "currency",
        formData.currency ?? user?.professional?.currency ?? "$"
      );
      fd.append(
        "entityType",
        formData.entityType ?? user?.professional?.entityType ?? "individual"
      );
      fd.append(
        "firmName",
        formData.firmName ?? user?.professional?.firmName ?? ""
      );
      fd.append(
        "exampleQuestions",
        JSON.stringify(
          formData.exampleQuestions ??
            user?.professional?.exampleQuestions ??
            []
        )
      );
      if (selectedFile) fd.append("profilePic", selectedFile);
      console.log("Submitting professional profile update:", fd);
      updateProfile.mutate(fd);
      return;
    }

    // Asker/admin (unchanged)
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    if (selectedFile) {
      formDataToSend.append("profilePic", selectedFile);
    }
    updateProfile.mutate(formDataToSend);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // Reset form data to original values
    if (user) {
      const base = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      };
      if (user.activeRole === "professional" && user.professional) {
        setFormData({
          ...base,
          description: user.professional?.about?.[0] || "",
          languages: Array.isArray(user.professional?.languages)
            ? [...user.professional.languages]
            : [],
          locations: Array.isArray(user.professional?.country)
            ? [...user.professional.country]
            : [],
        });
      } else {
        setFormData(base);
      }
    }
    setSelectedFile(null);
    setEditing(false);
  };

  const avatarInitial = (formData.firstName?.trim()[0] || "U").toUpperCase();

  // Choose view based on activeRole
  const role = user?.activeRole || "asker";

  return role === "professional" ? (
    <ProfessionalView
      formData={formData}
      handleInputChange={handleInputChange}
      editing={editing}
      setEditing={setEditing}
      setFormData={setFormData}
      avatarInitial={avatarInitial}
      user={user}
      handleSaveChanges={handleSaveChanges}
      handleCancelEdit={handleCancelEdit}
      handleFileChange={handleFileChange}
      fileInputRef={fileInputRef}
      isUpdating={updateProfile.isPending}
      selectedFile={selectedFile}
    />
  ) : (
    <DefaultView
      formData={formData}
      handleInputChange={handleInputChange}
      editing={editing}
      setEditing={setEditing}
      user={user}
      avatarInitial={avatarInitial}
      handleSaveChanges={handleSaveChanges}
      handleCancelEdit={handleCancelEdit}
      handleFileChange={handleFileChange}
      fileInputRef={fileInputRef}
      isUpdating={updateProfile.isPending}
      selectedFile={selectedFile}
    />
  );
};

export default ProfileView;
