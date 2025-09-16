import React, { useState, useEffect, memo, useRef } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";
import useUpdateProfile, {
  useCancelProfileDeletion,
  useRequestProfileDeletion,
} from "../hooks/userhooks";
import useSpecializations from "../hooks/useSpecializations";
import { allLanguages, allLocations, currencies } from "../utils/Constant";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ScheduledDeletionModal from "./ScheduleDeleteModal";

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
            {/* <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div> */}
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
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value.replace(/\s/g, ""),
                  }))
                }
                className="w-full text-sm rounded border p-2"
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex flex-col w-full">
              <label className="block text-sm text-gray-700 font-medium mb-3">
                First Name
              </label>
              <input
                type="text"
                className="w-full text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200"
                value={user?.firstName || ""}
                disabled
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-sm text-gray-700 font-medium mb-3">
                Last Name
              </label>
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
                {allLanguages.map((lang) => (
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
                {allLocations.map((loc) => (
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

      <div className="flex items-center mb-4">
        <label className="w-40 font-medium text-sm text-gray-700 flex-shrink-0">
          Social Links
        </label>
        <div className="w-full flex flex-col gap-2">
          <input
            type="url"
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            placeholder="LinkedIn URL"
            value={formData.socialLinks?.[0] || ""}
            disabled={!editing}
            onChange={(e) => {
              const arr = [...(formData.socialLinks || ["", "", "", ""])];
              arr[0] = e.target.value;
              setFormData((prev) => ({ ...prev, socialLinks: arr }));
            }}
          />
          <input
            type="url"
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            placeholder="Facebook URL"
            value={formData.socialLinks?.[1] || ""}
            disabled={!editing}
            onChange={(e) => {
              const arr = [...(formData.socialLinks || ["", "", "", ""])];
              arr[1] = e.target.value;
              setFormData((prev) => ({ ...prev, socialLinks: arr }));
            }}
          />
          <input
            type="url"
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            placeholder="Instagram URL"
            value={formData.socialLinks?.[2] || ""}
            disabled={!editing}
            onChange={(e) => {
              const arr = [...(formData.socialLinks || ["", "", "", ""])];
              arr[2] = e.target.value;
              setFormData((prev) => ({ ...prev, socialLinks: arr }));
            }}
          />
          <input
            type="url"
            className="border border-gray-300 rounded-md p-2 w-full text-sm"
            placeholder="Website URL"
            value={formData.socialLinks?.[3] || ""}
            disabled={!editing}
            onChange={(e) => {
              const arr = [...(formData.socialLinks || ["", "", "", ""])];
              arr[3] = e.target.value;
              setFormData((prev) => ({ ...prev, socialLinks: arr }));
            }}
          />
        </div>
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
          {/* <select
            value={formData.currency ?? prof.currency ?? ""}
            disabled={!editing}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                currency: e.target.value,
              }))
            }
            className={`w-1/3 text-sm rounded border p-2 ${
              editing ? "" : "bg-gray-100 text-gray-600"
            }`}
          >
            {currencies.map((currency, index) => (
              <option
                key={index}
                value={currency.sign}
                title={currency.description}
              >
                {currency.sign} - {currency.name}
              </option>
            ))}
          </select> */}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Individual / Firm or University
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
            <span className="text-sm">Firm or University</span>
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

      <div className="mb-4">
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
      </div>
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
    onRequestDeletion,
    onCancelDeletion,
    deletionState,
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
                // <button
                //   onClick={() => setEditing(true)}
                //   aria-label="Edit profile"
                //   className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
                // >
                //   <Edit />
                // </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    aria-label="Edit profile"
                    className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-50 border border-transparent"
                  >
                    <Edit />
                  </button>

                  {/* Delete professional profile button */}
                  <button
                    type="button"
                    onClick={onRequestDeletion}
                    className="inline-flex items-center justify-center px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-600"
                    title="Delete professional profile"
                    disabled={deletionState?.isPending}
                  >
                    {deletionState?.isPending
                      ? "Processing..."
                      : "Delete Profile"}
                  </button>
                </div>
              )}
              {/* <div className="text-xs text-gray-400 mt-1">
                * Mandatory fields
              </div> */}
            </div>
          </div>

          {deletionState?.scheduledAt && (
            <div className="mb-4 p-3 border border-red-100 bg-red-50 rounded text-sm text-red-700">
              <div className="font-medium">
                Professional profile scheduled for deletion
              </div>
              <div className="mt-1">
                Will be permanently deleted on{" "}
                <strong>
                  {new Date(deletionState.scheduledAt).toLocaleString()}
                </strong>
                .
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-700">
                  Time left: {deletionState.timeLeftText}
                </span>
                <button
                  type="button"
                  onClick={onCancelDeletion}
                  className="ml-auto inline-flex items-center px-3 py-1 rounded text-sm text-white bg-gray-700 hover:bg-gray-800"
                  disabled={deletionState?.isCancelling}
                >
                  {deletionState?.isCancelling
                    ? "Cancelling..."
                    : "Cancel Deletion"}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            {deletionState.scheduledAt && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                  <h2 className="text-lg font-semibold mb-2 text-red-600">
                    Professional profile scheduled for deletion
                  </h2>
                  <p className="text-sm text-gray-700 mb-4">
                    Your professional profile is scheduled to be permanently
                    deleted on{" "}
                    <strong>
                      {deletionState.scheduledAt.toLocaleString()}
                    </strong>
                    .
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    Time left until deletion:{" "}
                    <strong>{deletionState.timeLeftText}</strong>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={onCancelDeletion}
                      className="px-4 py-2 rounded bg-gray-700 text-white"
                      disabled={deletionState.isCancelling}
                    >
                      {deletionState.isCancelling
                        ? "Cancelling..."
                        : "Cancel Deletion"}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    If you cancel deletion you can continue using your
                    professional profile and switch back to it via the role
                    switch.
                  </div>
                </div>
              </div>
            )}
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
    socialLinks: [],
    languages: [],
    locations: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const deleteMutation = useRequestProfileDeletion();
  const cancelMutation = useCancelProfileDeletion();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [modalError, setModalError] = useState("");

  const openRequestModal = () => {
    setModalError("");
    setShowRequestModal(true);
  };
  const closeRequestModal = () => {
    setModalError("");
    setShowRequestModal(false);
  };

  const openCancelModal = () => {
    setModalError("");
    setShowCancelModal(true);
  };
  const closeCancelModal = () => {
    setModalError("");
    setShowCancelModal(false);
  };

  // Setup the update profile mutation
  const updateProfile = useUpdateProfile({
    onSuccess: async () => {
      setEditing(false);
      await refreshCurrentUser();
    },
  });

  const proDeletionScheduledAt = user?.deletionScheduledAt
    ? new Date(user.deletionScheduledAt)
    : null;

  const [timeLeftText, setTimeLeftText] = useState("");

  useEffect(() => {
    let t;
    function updateTimeLeft() {
      if (!proDeletionScheduledAt) {
        setTimeLeftText("");
        return;
      }
      const now = new Date();
      const diff = proDeletionScheduledAt - now;
      if (diff <= 0) {
        setTimeLeftText("Less than a second");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const pieces = [];
      if (days) pieces.push(`${days}d`);
      if (hours) pieces.push(`${hours}h`);
      if (minutes) pieces.push(`${minutes}m`);
      pieces.push(`${seconds}s`);
      setTimeLeftText(pieces.join(" "));
    }
    updateTimeLeft();
    if (proDeletionScheduledAt) {
      t = setInterval(updateTimeLeft, 1000);
    }
    return () => clearInterval(t);
  }, [user?.deletionScheduledAt]);


  const handleRequestDeletion = () => openRequestModal();
  const handleCancelDeletion = () => openCancelModal();
  const confirmRequestDeletion = async () => {
    try {
      setModalError("");
      await deleteMutation.mutateAsync();
      closeRequestModal();
    } catch (err) {
      console.error("Deletion request failed", err);
      setModalError(
        err?.response?.data?.message || "Failed to request deletion."
      );
    }
  };

  // user confirmed cancel deletion inside modal
  const confirmCancelDeletion = async () => {
    try {
      setModalError("");
      await cancelMutation.mutateAsync();
      closeCancelModal();
    } catch (err) {
      console.error("Cancel deletion failed", err);
      setModalError(
        err?.response?.data?.message || "Failed to cancel deletion."
      );
    }
  };

  const deletionState = {
    scheduledAt: proDeletionScheduledAt,
    timeLeftText,
    isPending: deleteMutation.isLoading,
    isCancelling: cancelMutation.isLoading,
  };

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
        socialLinks: Array.isArray(user.professional?.socialLinks)
          ? [...user.professional.socialLinks]
          : ["", "", "", ""],
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
      // fd.append(
      //   "currency",
      //   formData.currency ?? user?.professional?.currency ?? "$"
      // );
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
      fd.append(
        "professionalExperiences",
        JSON.stringify(
          formData.professionalExperiences ??
            user?.professional?.professionalExperiences ??
            []
        )
      );
      fd.append(
        "socialLinks",
        JSON.stringify(
          formData.socialLinks ??
            user?.professional?.socialLinks ?? ["", "", "", ""]
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

  const handleLinkLinkedIn = () => {
    const userId = user?._id;
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/users/auth/linkedin/link?userId=${userId}`;
  };

  // Choose view based on activeRole
  const role = user?.activeRole || "asker";

  return role === "professional" ? (
    <>
      {!user?.professional?.verified && (
        <div className="mb-4">
          <button
            onClick={handleLinkLinkedIn}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Link LinkedIn to Verify
          </button>
        </div>
      )}
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
        onRequestDeletion={handleRequestDeletion}
        onCancelDeletion={handleCancelDeletion}
        deletionState={deletionState}
      />


      <DeleteConfirmationModal
        open={showRequestModal}
        title="Delete professional profile"
        description="This will schedule permanent deletion of your professional profile in 5 days. Are you sure you want to proceed?"
        error={modalError}
        loading={deleteMutation.isPending}
        confirmLabel="Yes, schedule deletion"
        cancelLabel="Cancel"
        onClose={closeRequestModal}
        onConfirm={confirmRequestDeletion}
        confirmClassName="px-4 py-2 rounded bg-red-600 text-white"
      />

      {/* Scheduled deletion info + cancel action (reusable) */}
      <ScheduledDeletionModal
        open={
          showCancelModal ||
          Boolean(deletionState.scheduledAt && showCancelModal)
        }
        scheduledAt={deletionState.scheduledAt}
        timeLeftText={deletionState.timeLeftText}
        error={modalError}
        onClose={closeCancelModal}
        onCancelDeletion={confirmCancelDeletion}
        cancelling={cancelMutation.isPending}
      />
    </>
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
