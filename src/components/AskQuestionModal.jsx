import React, { useState, useRef, useEffect } from "react";
import DropdownSelector from "./DropdownSelector";
import TermsModal from "./TermsModal";
import { ConfirmModal } from "./ConfirmModal";
import { DiscardModal } from "./DiscardModal";

const deliveryOptions = [
  { label: "Normal", value: "Normal" },
  { label: "Fast-Track", value: "Fast-Track" },
];

const AskQuestionModal = ({ professional, onClose }) => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("Normal");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [budget, setBudget] = useState("");
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef();


  const handleClose = () => setShowDiscard(true);

  const handleDiscard = () => {
    setShowDiscard(false);
    onClose();
  };

  const handleDoneClick = () => setShowConfirm(true);

  const handleConfirm = () => {
    setShowConfirm(false);
    handleSubmit();
  };

  // Handle actual image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) return;
    setImages([...images, ...files]);
    e.target.value = "";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  // Simulate submit
  const handleSubmit = () => {
    if (!agreed) return;
    // Prepare request body for API
    const formData = new FormData();
    formData.append("professionalId", professional.id);
    formData.append("description", description);
    formData.append("deliveryTime", deliveryTime);
    formData.append("budget", budget);
    images.forEach((img) => formData.append("images", img));
    // Example: fetch('/api/ask', { method: 'POST', body: formData });
    onClose();
  };

  // Budget options for dropdown
  const budgetOptions = Array.from(
    { length: professional.priceEnd - professional.priceStart + 1 },
    (_, i) => professional.priceStart + i
  );

  // Dots for phase indicator (top right, visually aligned)
  const PhaseDots = () => (
    <div className="flex gap-2 items-center">
      <span
        className={`w-2 h-2 rounded-full ${
          step === 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
        style={{ display: "inline-block" }}
      />
      <span
        className={`w-2 h-2 rounded-full ${
          step === 2 ? "bg-blue-600" : "bg-gray-300"
        }`}
        style={{ display: "inline-block" }}
      />
    </div>
  );

  const ProfileHeader = () => (
    <div className="flex items-center  gap-3 mb-4">
      <div className="flex">
        <img
          src={professional.avatar}
          alt={professional.name}
          className="w-14 h-14 rounded"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base pl-2">
              {professional.name}
            </span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#22C55E" />
                <path
                  d="M17 9l-5 5-3-3"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-xs text-blue-600 underline cursor-pointer pl-2">
              See Profile
            </span>
          </div>

          <span className="text-xs text-gray-500 pl-2">
            {professional.title}
          </span>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <PhaseDots />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-0 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        {/* <PhaseDots /> */}
        {/* Step 1: Ask Question */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Hi, I'm {professional.name} <span className="ml-2">👋</span>
            </h2>
            <ProfileHeader />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <div className="border rounded-lg bg-gray-50 p-3 mb-2">
                <textarea
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={3}
                  placeholder="Type your question..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button className="float-right mt-2 px-4 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                Done
              </button>
            </div>
            <div className="mb-4">
              <span className="text-xs text-gray-500 block mb-1 flex items-center gap-1">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7l9 6 9-6"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Attach Images (max - 5)
              </span>
              <div className="flex flex-col gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${idx + 1}`}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <span className="text-xs">Image {idx + 1}</span>
                    <button
                      className="ml-auto text-gray-400 hover:text-gray-700"
                      onClick={() =>
                        window.open(URL.createObjectURL(img), "_blank")
                      }
                      title="Open"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 3h7v7"
                          stroke="#64748B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 19l14-14"
                          stroke="#64748B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="ml-2 text-gray-400 hover:text-gray-700"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 6l12 12M6 18L18 6"
                          stroke="#64748B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <div>
                    <button
                      className="bg-blue-50 px-3 py-1 rounded text-xs text-blue-600 font-medium"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Add
                    </button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex justify-between space-between">
              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1">
                  Select Delivery Time
                </label>
                <span className="text-xs text-gray-500 block mt-1">
                  Fast-track answers include an additional payment.
                </span>
              </div>

              <div className="min-w-[120px]">
                <DropdownSelector
                  options={deliveryOptions.map((opt) => opt.label)}
                  value={deliveryTime}
                  onChange={(label) => {
                    const selected = deliveryOptions.find(
                      (opt) => opt.label === label
                    );
                    setDeliveryTime(selected ? selected.value : label);
                  }}
                  placeholder="Select delivery"
                  rounded={false}
                  disabled={false}
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition"
                onClick={() => setStep(2)}
                disabled={!description}
              >
                Next <span className="ml-2">&#8594;</span>
              </button>
            </div>
          </div>
        )}
        {/* Step 2: Summary & Budget */}
        {step === 2 && (
          <div className="p-8">
            <div className="flex ">
              <div>
                <h2 className="text-xl font-semibold mb-4">Set your budget</h2>
                <ProfileHeader />
                <div className="mb-4 ">
                  <label className="block text-sm font-medium mb-1">
                    Set a budget
                  </label>

                  <span className="text-xs text-gray-500 mt-1 block">
                    This professional has set their price between $
                    {professional.priceStart} and ${professional.priceEnd}.
                    Please enter or select an amount within this range.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 ">
                  <select
                    className="border rounded px-2 py-1"
                    value={budget || professional.priceStart}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    {budgetOptions.map((price) => (
                      <option key={price} value={price}>
                        ${price}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-500 text-sm font-medium">
                    ${professional.priceStart} - ${professional.priceEnd}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-base">Summary</span>
              <div className="border rounded-lg p-3 mt-2 bg-gray-50">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">
                    Description:
                  </span>
                  <span className="ml-2 text-gray-700">{description}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">
                    Images Attached
                  </span>
                  <span className="ml-2 text-gray-700">— {images.length}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">
                    Delivery Time
                  </span>
                  <span className="ml-2 text-gray-700">— {deliveryTime}</span>
                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id="agree"
              />
              <label htmlFor="agree" className="ml-2 text-sm">
                Please agree to the{" "}
                <span className="text-red-500 underline" onClick={() => setShowTerms(true)}>Terms of use</span>{" "}
                before submitting.
              </label>
            </div>
            {!agreed && (
              <div className="mb-2 text-red-500 text-xs bg-red-50 p-2 rounded flex items-center">
                <span className="mr-2">|</span>
                Please agree to the
                <span className="underline" onClick={() => setShowTerms(true)}>Terms of use</span > before
                submitting.
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className={`bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition ${
                  !agreed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setShowConfirm(true)}
                disabled={!agreed}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
        <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        agreed={agreed}
        setAgreed={setAgreed}
      />
      <DiscardModal
        open={showDiscard}
        onClose={() => setShowDiscard(false)}
        onDiscard={handleDiscard}
      />
    </div>
    
  );
};

export default AskQuestionModal;
