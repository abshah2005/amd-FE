
import React from "react";

export const DeleteQnModal = ({ open, onClose, onDiscard }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-[80%] md:w-full max-w-md p-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-base p-2 font-semibold mb-2 text-red-600">Delete this question?</h2>
        <p className="text-gray-700 mb-4 text-sm p-2">
          This Action will permanently remove your question and any Related information This cannot be undone.<br />
          <span className="font-semibold">Are you sure you want to proceed?</span>
        </p>
        <hr className="my-4 border-gray-200" />
        <div className="flex justify-end items-center mt-2">
          <button
            className="bg-white text-gray-700 px-4 py-2 rounded font-semibold text-sm  border border-transparent"
            onClick={onDiscard}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700"
            onClick={onClose}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

