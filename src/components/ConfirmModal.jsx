import React, { useEffect } from "react";

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  agreed,
  state,
  setAgreed,
  isLoading,
}) => {
  // Check local storage for saved agreement when modal opens
  useEffect(() => {
    if (open) {
      const savedAgreement = localStorage.getItem("termsAgreement") === "true";
      if (savedAgreement) {
        setAgreed(true);
      }
    }
  }, [open, setAgreed]);

  // Save agreement to local storage when checkbox is checked
  const handleAgreementChange = (e) => {
  const isChecked = e.target.checked;
  dispatch({ type: "SET_AGREED", value: isChecked });
  
  if (isChecked) {
    localStorage.setItem('termsAgreement', 'true');
  }
}

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-[80%] md:w-full max-w-md p-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-2 p-2">
          Please confirm your question details
        </h2>
        <p className="text-gray-700 mb-4 p-2">
          Your question and info will be shared privately with the selected
          professional.
          <br />
          Please review everything before continuing.
        </p>

        <div className="mb-4 flex flex-col p-2">
          <div>
            {/* <input
              type="checkbox"
              checked={agreed}
              onChange={handleAgreementChange}
              id="confirm-agree"
            /> */}
            <input
              type="checkbox"
              checked={state.agreed}
              onChange={handleAgreementChange}
              id="agree"
            />
            <label htmlFor="confirm-agree" className="ml-2 text-sm ">
              Save my agreement to the Terms of Use for future questions.
            </label>
          </div>

          <p className="text-xs text-gray-500 ">
            (You won't be asked to review them again unless they change.)
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              !agreed || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onConfirm}
            disabled={!agreed || isLoading}
          >
            {isLoading ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
