import React from "react";

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  agreed,
  setAgreed,
}) => {
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
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              id="confirm-agree"
            />
            <label htmlFor="confirm-agree" className="ml-2 text-sm ">
              Save my agreement to the Terms of Use for future questions.
            </label>
          </div>

          <p className="text-xs text-gray-500 ">
            (You won't be asked to review them again unless they change.)
          </p>
        </div>

        <div className="flex justify-end gap-6 mt-4">
          <button
            className=" text-gray-700 px-4 py-2 font-semibold text-sm "
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 ${
              !agreed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onConfirm}
            disabled={!agreed}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
