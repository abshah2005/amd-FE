import React, { useState, useEffect, memo, useRef } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import Edit from "../icons/Edit";
import useUpdateProfile from "../hooks/userhooks"; 
import useSpecializations from "../hooks/useSpecializations";

const DefaultView = memo(({ 
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
  selectedFile // <-- add this prop
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12M8 7l4-4 4 4M21 21H3" />
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
          <label className="block text-sm text-gray-700 font-medium mb-3">
            Full Name
          </label>

          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">First Name</div>
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
              <div className="text-xs text-gray-500 mb-1">Last Name</div>
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
));


const PersonalInfoBox = ({ user, avatarInitial, editing, formData, setFormData }) => {
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
    setFormData(prevState => ({ ...prevState, [field]: next }));
    console.log({ field, old: prev, new: next });
    resetFn("");
  };

  const removeItem = (field, idx) => {
    const prev = Array.isArray(formData[field]) ? [...formData[field]] : [];
    const next = prev.filter((_, i) => i !== idx);
    setFormData(prevState => ({ ...prevState, [field]: next }));
    console.log({ field, old: prev, new: next });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
      <h3 className="text-base font-semibold mb-2">Personal Information</h3>
      <p className="text-xs text-gray-500 mb-4">
        Tell us a bit about yourself. This information helps askers better understand who you are and builds confidence in your expertise.
      </p>

      <div className="flex flex-col items-center mb-6">
        {user?.profilePic ? (
          <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
            {avatarInitial}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Full Name</label>
        {editing ? (
          <div className="flex gap-3">
            <input
              name="firstName"
              value={formData.firstName || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))
              }
              className="w-1/2 text-sm rounded border p-2"
            />
            <input
              name="lastName"
              value={formData.lastName || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))
              }
              className="w-1/2 text-sm rounded border p-2"
            />
          </div>
        ) : (
          <div className="flex gap-3">
            <input type="text" className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={user?.firstName || ""} disabled />
            <input type="text" className="w-1/2 text-sm rounded border p-2 bg-gray-100 text-gray-600 border-gray-200" value={user?.lastName || ""} disabled />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Description</label>
        {editing ? (
          <textarea
            value={formData.description || user?.professional?.about?.[0] || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))
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
        <label className="block text-sm text-gray-700 font-medium mb-1">Languages</label>
        {editing ? (
          <>
            <div className="flex gap-2 mb-2">
              <input
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                placeholder="Add language"
                className="flex-1 border rounded p-2 text-sm"
              />
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-200 text-sm"
                onClick={() => addItem("languages", langInput.trim(), setLangInput)}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.languages || user?.professional?.languages || []).map((lang, idx) => (
                <span key={lang + idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center">
                  {lang}
                  <button type="button" className="ml-1 text-gray-400 hover:text-red-500" onClick={() => removeItem("languages", idx)}>×</button>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(user?.professional?.languages || []).map((lang, idx) => (
              <span key={lang + idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{lang}</span>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Location</label>
        {editing ? (
          <>
            <div className="flex gap-2 mb-2">
              <input
                value={locInput}
                onChange={(e) => setLocInput(e.target.value)}
                placeholder="Add location"
                className="flex-1 border rounded p-2 text-sm"
              />
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-200 text-sm"
                onClick={() => addItem("locations", locInput.trim(), setLocInput)}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.locations || user?.professional?.country || []).map((loc, idx) => (
                <span key={loc + idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs flex items-center">
                  {loc}
                  <button type="button" className="ml-1 text-gray-400 hover:text-red-500" onClick={() => removeItem("locations", idx)}>×</button>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(user?.professional?.country || []).map((loc, idx) => (
              <span key={loc + idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{loc}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
  
const ProfessionalInfoBox = ({ user, avatarInitial, editing = false, formData = {}, setFormData = () => {} }) => {
  const prof = user?.professional || {};
  const { specializations: specList = [], loading: specsLoading } = useSpecializations();
  const [openSpecs, setOpenSpecs] = useState({}); // track expanded categories

  // normalize existing selections from user.professional.selectedSpecializations
  const normalizeProfSelected = () => {
    const sel = prof.selectedSpecializations || [];
    return sel
      .map((s) => {
        if (!s) return null;
        if (typeof s === "string") return { specialization: s, subCategory: null };
        if (typeof s === "object") return { specialization: s.specialization || "", subCategory: s.subCategory ?? null };
        return null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    // initialize formData.selectedSpecializations only once when professional data becomes available
    if (!formData.selectedSpecializations) {
      const initial = normalizeProfSelected();
      setFormData((prev) => ({ ...prev, selectedSpecializations: initial }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.professional?._id]);

  // helpers
  const getSelectedForSpec = (specName) =>
    (formData.selectedSpecializations || []).filter((s) => (s?.specialization || "") === specName);

  const isSpecSelected = (specName) => getSelectedForSpec(specName).length > 0;
  const isSubSelected = (specName, sub) =>
    (formData.selectedSpecializations || []).some((s) => (s?.specialization || "") === specName && (s?.subCategory ?? null) === sub);

  const toggleSpec = (specName) => {
    const prev = Array.isArray(formData.selectedSpecializations) ? [...formData.selectedSpecializations] : [];
    const has = prev.some((s) => (s?.specialization || "") === specName);
    const next = has ? prev.filter((s) => (s?.specialization || "") !== specName) : [...prev, { specialization: specName, subCategory: null }];
    setFormData((p) => ({ ...p, selectedSpecializations: next }));
    console.log({ field: "selectedSpecializations", old: prev, new: next });
    if (!has) setOpenSpecs((o) => ({ ...o, [specName]: true }));
  };

  const toggleSub = (specName, sub) => {
    const prev = Array.isArray(formData.selectedSpecializations) ? [...formData.selectedSpecializations] : [];
    // if sub already selected -> remove specific entry
    const existsIdx = prev.findIndex((s) => (s?.specialization || "") === specName && (s?.subCategory ?? null) === sub);
    let next;
    if (existsIdx >= 0) {
      next = prev.filter((_, i) => i !== existsIdx);
      // if removing last sub and there is an entry {spec, subCategory:null} keep none
    } else {
      next = [...prev, { specialization: specName, subCategory: sub }];
    }
    setFormData((p) => ({ ...p, selectedSpecializations: next }));
    console.log({ field: "selectedSpecializations", old: prev, new: next });
    setOpenSpecs((o) => ({ ...o, [specName]: true }));
  };

  const removeSpec = (specName) => {
    const prev = Array.isArray(formData.selectedSpecializations) ? [...formData.selectedSpecializations] : [];
    const next = prev.filter((s) => (s?.specialization || "") !== specName);
    setFormData((p) => ({ ...p, selectedSpecializations: next }));
    console.log({ field: "selectedSpecializations", old: prev, new: next });
    setOpenSpecs((o) => ({ ...o, [specName]: false }));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 w-full">
      <h3 className="text-base font-semibold mb-2">Professional Details</h3>
      <p className="text-xs text-gray-500 mb-4">
        Highlight your expertise. Share your background, qualifications, and areas of knowledge so askers know why you’re the right fit.
      </p>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Select up-to one category.</label>

        {specsLoading ? (
          <div className="text-sm text-gray-500">Loading specializations…</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded">
              {specList.map((spec) => {
                const specName = spec?.name || spec?.specialization || String(spec);
                const checked = isSpecSelected(specName);
                return (
                  <label key={specName} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!editing}
                      onChange={() => toggleSpec(specName)}
                      className="w-4 h-4"
                    />
                    <span className={`text-sm ${checked ? "font-medium text-gray-800" : "text-gray-700"}`}>{specName}</span>
                  </label>
                );
              })}
            </div>

            {/* Selected categories -> show panels like onboarding UI */}
            <div className="mt-4 space-y-4">
              {(specList || [])
                .filter((s) => isSpecSelected(s?.name || s?.specialization || String(s)))
                .map((spec) => {
                  const specName = spec?.name || spec?.specialization || String(spec);
                  const subCats = Array.isArray(spec.subCategories) ? spec.subCategories : [];
                  const expanded = !!openSpecs[specName];
                  return (
                    <div key={"panel-" + specName} className="border rounded">
                      <div className="flex items-center justify-between p-3">
                        <button
                          type="button"
                          onClick={() => setOpenSpecs((o) => ({ ...o, [specName]: !o[specName] }))}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="font-medium">{specName}</span>
                          <span className="text-xs text-gray-500">{expanded ? "▾" : "▸"}</span>
                        </button>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => removeSpec(specName)}
                            className="text-red-500 text-sm px-2 py-1"
                            aria-label={`Remove ${specName}`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <div className="p-3 bg-gray-50">
                          {subCats.length > 0 ? (
                            <>
                              <div className="text-xs text-gray-500 mb-2">Selected sub-categories</div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {subCats.map((sub) => (
                                  <label key={specName + "::" + sub} className="flex items-center gap-2 cursor-pointer text-sm p-2 border rounded">
                                    <input
                                      type="checkbox"
                                      checked={isSubSelected(specName, sub)}
                                      disabled={!editing}
                                      onChange={() => toggleSub(specName, sub)}
                                      className="w-4 h-4"
                                    />
                                    <span>{sub}</span>
                                  </label>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-600">No sub-categories</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>

      {/* Tags and other professional fields (unchanged) */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(prof.tags || []).map((tag, idx) => {
            const active = (formData.tags || prof.tags || []).includes(tag);
            return (
              <button
                key={tag + idx}
                type="button"
                disabled={!editing}
                onClick={() => {
                  const prev = Array.isArray(formData.tags) ? [...formData.tags] : (prof.tags || []);
                  const exists = prev.includes(tag);
                  const next = exists ? prev.filter((t) => t !== tag) : [...prev, tag];
                  setFormData((p) => ({ ...p, tags: next }));
                  console.log({ field: "tags", old: prev, new: next });
                }}
                className={`px-2 py-1 rounded text-xs border ${active ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-gray-100 text-gray-700"}`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {editing && (
          <div className="flex gap-2 mt-2">
            <input
              placeholder="Add custom tag"
              className="flex-1 border rounded p-2 text-sm"
              value={formData._newTag || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, _newTag: e.target.value }))}
            />
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-200 text-sm"
              onClick={() => {
                const v = (formData._newTag || "").trim();
                if (!v) return;
                const prev = Array.isArray(formData.tags) ? [...formData.tags] : (prof.tags || []);
                if (prev.includes(v)) {
                  setFormData((p) => ({ ...p, _newTag: "" }));
                  return;
                }
                const next = [...prev, v];
                setFormData((p) => ({ ...p, tags: next, _newTag: "" }));
                console.log({ field: "tags", old: prev, new: next });
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* other fields (price, entity, example questions) unchanged */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Indicative Price Range</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={formData.priceRangeLow ?? prof.priceRangeLow ?? ""}
            disabled={!editing}
            onChange={(e) => setFormData(prev => ({ ...prev, priceRangeLow: e.target.value }))
            }
            className={`w-1/3 text-sm rounded border p-2 ${editing ? "" : "bg-gray-100 text-gray-600"}`}
          />
          <span className="mx-2 text-gray-500">—</span>
          <input
            type="number"
            value={formData.priceRangeHigh ?? prof.priceRangeHigh ?? ""}
            disabled={!editing}
            onChange={(e) => setFormData(prev => ({ ...prev, priceRangeHigh: e.target.value }))
            }
            className={`w-1/3 text-sm rounded border p-2 ${editing ? "" : "bg-gray-100 text-gray-600"}`}
          />
          <input
            value={formData.currency ?? prof.currency ?? "$"}
            disabled={!editing}
            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))
            }
            className="ml-2 w-20 text-sm rounded border p-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Individual / Firm</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="entityType" value="individual" disabled={!editing}
              checked={(formData.entityType ?? prof.entityType ?? "individual") === "individual"}
              onChange={() => setFormData(prev => ({ ...prev, entityType: "individual" }))
              }
            />
            <span className="text-sm">Individual</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="entityType" value="firm" disabled={!editing}
              checked={(formData.entityType ?? prof.entityType) === "firm"}
              onChange={() => setFormData(prev => ({ ...prev, entityType: "firm" }))
              }
            />
            <span className="text-sm">Firm</span>
          </label>
          {((formData.entityType ?? prof.entityType) === "firm") && (
            <input
              placeholder="Firm name"
              value={formData.firmName ?? prof.firmName ?? ""}
              disabled={!editing}
              onChange={(e) => setFormData(prev => ({ ...prev, firmName: e.target.value }))
              }
              className="ml-4 text-sm rounded border p-2"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">Example Questions</label>
        <ul className="list-decimal ml-6 mb-2">
          {((formData.exampleQuestions && formData.exampleQuestions.length > 0) ? formData.exampleQuestions : (prof.exampleQuestions || [])).map((q, idx) => (
            <li key={idx} className="text-sm text-gray-700 mb-1">{q}</li>
          ))}
        </ul>
        {editing && (
          <div className="flex gap-2">
            <input
              placeholder="Add example question"
              className="flex-1 border rounded p-2 text-sm"
              value={formData._newExample || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, _newExample: e.target.value }))}
            />
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-200 text-sm"
              onClick={() => {
                const v = (formData._newExample || "").trim();
                if (!v) return;
                const prev = Array.isArray(formData.exampleQuestions) ? [...formData.exampleQuestions] : (prof.exampleQuestions || []);
                const next = [...prev, v];
                setFormData(prev => ({ ...prev, exampleQuestions: next, _newExample: "" }));
                console.log({ field: "exampleQuestions", old: prev, new: next });
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



const ProfessionalView = memo(({
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
  selectedFile
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
                {/* <Edit /> */}
              </button>
            )}
            <div className="text-xs text-gray-400 mt-1">* Mandatory fields</div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="w-full">
            <PersonalInfoBox
              user={user}
              avatarInitial={avatarInitial}
              editing={editing}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="w-full">
            {/* <ProfessionalInfoBox user={user} avatarInitial={avatarInitial} /> */}
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
});


const ProfileView = () => {
  const { user,refreshCurrentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // added professional fields so editing shows existing values and add/remove works
    description: "",
    languages: [],
    locations: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Setup the update profile mutation
  const updateProfile = useUpdateProfile({
    onSuccess:async () => {
      setEditing(false);
      await refreshCurrentUser();
    }
  });

  // Initialize form from user when available
  useEffect(() => {
    if (!user) return;

    // Base fields
    const base = {
      firstName: user.firstName || "",
      lastName: user.lastName || ""
    };

    // If professional, include professional-specific fields
    if (user.activeRole === "professional" ) {
      setFormData({
        ...base,
        description: user.professional?.about?.[0] || "",
        // prefer arrays, fallback to empty arrays
        languages: Array.isArray(user.professional?.languages) ? [...user.professional.languages] : [],
        locations: Array.isArray(user.professional?.country) ? [...user.professional.country] : []
      });
    } else {
      // asker/admin flow (unchanged)
      setFormData(base);
    }
  }, [user]);

  // Handle input changes with a single handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      fd.append("tags", JSON.stringify(formData.tags ?? user?.professional?.tags ?? []));
      fd.append("selectedSpecializations", JSON.stringify(formData.selectedSpecializations ?? (user?.professional?.selectedSpecializations || []).map(s => s.specialization)));
      fd.append("priceRangeLow", formData.priceRangeLow ?? user?.professional?.priceRangeLow ?? "");
      fd.append("priceRangeHigh", formData.priceRangeHigh ?? user?.professional?.priceRangeHigh ?? "");
      fd.append("currency", formData.currency ?? user?.professional?.currency ?? "$");
      fd.append("entityType", formData.entityType ?? user?.professional?.entityType ?? "individual");
      fd.append("firmName", formData.firmName ?? user?.professional?.firmName ?? "");
      fd.append("exampleQuestions", JSON.stringify(formData.exampleQuestions ?? user?.professional?.exampleQuestions ?? []));
      if (selectedFile) fd.append("profilePic", selectedFile);
      console.log("Submitting professional profile update:",fd )
      // updateProfile.mutate(fd);
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
        lastName: user.lastName || ""
      };
      if (user.activeRole === "professional" && user.professional) {
        setFormData({
          ...base,
          description: user.professional?.about?.[0] || "",
          languages: Array.isArray(user.professional?.languages) ? [...user.professional.languages] : [],
          locations: Array.isArray(user.professional?.country) ? [...user.professional.country] : []
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