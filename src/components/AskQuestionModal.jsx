import React, { useState, useRef, useEffect } from "react";
import DropdownSelector from "./DropdownSelector";
import TermsModal from "./TermsModal";
import { ConfirmModal } from "./ConfirmModal";
import { DiscardModal } from "./DiscardModal";
import ImageSelectorModal from "./ImageSelectorModal";

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
  const [showImageSelector, setShowImageSelector] = useState(false);
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

  // Handler for images selected in modal
  const handleSelectImages = (selectedImages) => {
    setImages(selectedImages);
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
              {/* <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#22C55E" />
                <path
                  d="M17 9l-5 5-3-3"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3334 8.66664C13.3334 12 11.0001 13.6666 8.22675 14.6333C8.08152 14.6825 7.92377 14.6802 7.78008 14.6266C5.00008 13.6666 2.66675 12 2.66675 8.66664V3.99997C2.66675 3.82316 2.73699 3.65359 2.86201 3.52857C2.98703 3.40355 3.1566 3.33331 3.33341 3.33331C4.66675 3.33331 6.33341 2.53331 7.49341 1.51997C7.63465 1.39931 7.81432 1.33301 8.00008 1.33301C8.18585 1.33301 8.36551 1.39931 8.50675 1.51997C9.67342 2.53997 11.3334 3.33331 12.6667 3.33331C12.8436 3.33331 13.0131 3.40355 13.1382 3.52857C13.2632 3.65359 13.3334 3.82316 13.3334 3.99997V8.66664Z"
                  stroke="#36B37E"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7.99984L7.33333 9.33317L10 6.6665"
                  stroke="#36B37E"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="text-xs text-blue-800  cursor-pointer pl-2">
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
      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-full max-w-2xl p-0 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
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
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_402_1934)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.4733 11.7102C13.0045 11.1789 13.303 10.4583 13.303 9.70688C13.303 8.9555 13.0045 8.23489 12.4733 7.70355L8.11326 3.34355C7.98816 3.21854 7.91785 3.04896 7.91779 2.87212C7.91772 2.69527 7.98792 2.52564 8.11292 2.40055C8.23793 2.27545 8.40751 2.20514 8.58435 2.20508C8.7612 2.20502 8.93083 2.27521 9.05592 2.40021L13.4159 6.76021C14.1974 7.54154 14.6365 8.60132 14.6367 9.70641C14.6368 10.8115 14.1979 11.8714 13.4166 12.6529C12.6353 13.4344 11.5755 13.8735 10.4704 13.8736C9.3653 13.8738 8.30543 13.4349 7.52392 12.6535L2.22125 7.35021C1.65855 6.78742 1.34247 6.02415 1.34253 5.22831C1.34259 4.43247 1.6588 3.66925 2.22159 3.10655C2.78438 2.54385 3.54765 2.22776 4.34349 2.22782C5.13933 2.22788 5.90255 2.54409 6.46525 3.10688L11.7673 8.40888C12.103 8.75465 12.2892 9.21863 12.2856 9.70056C12.282 10.1825 12.0889 10.6437 11.7481 10.9844C11.4073 11.3251 10.9461 11.5181 10.4641 11.5215C9.98221 11.525 9.51827 11.3387 9.17259 11.0029L4.34192 6.17155C4.21683 6.04654 4.14652 5.87696 4.14645 5.70012C4.14639 5.52327 4.21658 5.35364 4.34159 5.22855C4.46659 5.10345 4.63617 5.03314 4.81302 5.03308C4.98987 5.03302 5.15949 5.10321 5.28459 5.22821L10.1159 10.0595C10.2098 10.1535 10.3372 10.2064 10.47 10.2064C10.6029 10.2065 10.7303 10.1538 10.8243 10.0599C10.9182 9.96599 10.9711 9.83862 10.9711 9.70578C10.9712 9.57294 10.9185 9.44552 10.8246 9.35155L5.52259 4.04955C5.3678 3.89467 5.18403 3.77181 4.98176 3.68796C4.77949 3.60411 4.56269 3.56092 4.34373 3.56086C4.12477 3.56079 3.90794 3.60386 3.70562 3.68759C3.5033 3.77133 3.31946 3.8941 3.16459 4.04888C2.85181 4.36148 2.67602 4.78553 2.6759 5.22774C2.67577 5.66995 2.85132 6.0941 3.16392 6.40688L8.46659 11.7095C8.99793 12.2408 9.71854 12.5393 10.4699 12.5393C11.2213 12.5393 11.9419 12.2408 12.4733 11.7095V11.7102Z"
                        fill="#4D5B70"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_402_1934">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Attach Images <span className="text-gray-400">(max - 5)</span>
                </span>
                <button
                  className="float-right mt-2 px-4 py-1 rounded  text-blue-800 text-sm font-medium"
                  onClick={() => setShowImageSelector(true)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div
                className="flex flex-col gap-2   h-[10vh] md:h-[15vh] overflow-y-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Image ${idx + 1}`}
                      className="w-14 h-14 rounded object-cover bg-gray-100"
                    />
                    <span className="text-xs text-gray-800">
                      Image {idx + 1}
                    </span>
                    <button
                      className="ml-auto bg-gray-100 rounded px-2 py-1 flex items-center justify-center"
                      onClick={() =>
                        window.open(URL.createObjectURL(img), "_blank")
                      }
                      title="Open"
                    >
                      <svg
                        width="16"
                        height="16"
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
                    {/* <button
                      className="ml-2 bg-gray-100 rounded px-2 py-1 flex items-center justify-center"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="12" fill="#F0F1F3" />
                        <path
                          d="M6 6l12 12M6 18L18 6"
                          stroke="#EF4444"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button> */}
                    <button
                      className="ml-2 bg-gray-100 rounded px-2 py-1 flex items-center justify-center"
                      title="More"
                      disabled
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="5" cy="12" r="2" fill="#64748B" />
                        <circle cx="12" cy="12" r="2" fill="#64748B" />
                        <circle cx="19" cy="12" r="2" fill="#64748B" />
                      </svg>
                    </button>
                  </div>
                ))}
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
            <div className="mb-2 text-gray-800 text-xs bg-red-50 p-2 rounded flex items-center justify-between">
              <div>
                <span className="mr-2 text-md">|</span>
                Please agree to the
                <span
                  className="text-bold cursor-pointer text-red-500"
                  onClick={() => setShowTerms(true)}
                >
                  Terms of use
                </span>
                <span>before submitting</span>
              </div>

              <div className="flex justify-center items-center mt-auto">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  id="agree"
                />
              </div>
            </div>
            {!agreed && (
              <div className="mb-2 text-red-500 text-xs  p-2 rounded flex items-center">
                You must agree to the Terms of Use
                <span>to submit</span>
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
      <ImageSelectorModal
        open={showImageSelector}
        onClose={() => setShowImageSelector(false)}
        onSelectImages={(imgs) => setImages(imgs)}
        initialImages={images}
      />
    </div>
  );
};

export default AskQuestionModal;
