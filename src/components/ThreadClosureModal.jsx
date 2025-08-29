import React, { useState } from "react";

export default function ThreadClosureModal({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState("");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-blue-700">
            Thread Closure Confirmation
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div>
          <p className="mb-4 text-gray-700">
            Mark this question thread as complete once you've provided your
            final answer and no further follow-up is expected.
          </p>
          <p className="mb-4 text-gray-700">
            Once closed, the asker will no longer be able to reply.
          </p>
        </div>

        {/* Warning Section */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowWarning(!showWarning)}
          >
            <span className="text-sm font-medium text-yellow-700">
              Early Thread Closure Warning
            </span>
            <button className="text-yellow-700 text-sm">
              {showWarning ? "▲" : "▼"}
            </button>
          </div>
          {showWarning && (
            <div className="mt-2 text-sm text-yellow-700">
              Closing this thread before the 48-hour follow-up period will
              result in:
              <ul className="list-disc pl-5">
                <li>15% deduction from your earnings for this question</li>
                <li>
                  This closure will be tracked on your profile as "Early
                  Closure"
                </li>
                <li>
                  Your early closure rate will be visible to future clients
                </li>
              </ul>
              Are you sure you want to close this thread now?
            </div>
          )}
        </div>

        {/* Message Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your final message here..."
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none h-18 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            className={`px-6 py-2  text-black ${
              message.trim() && !loading
                ? "  hover:shadow-md"
                : " cursor-not-allowed"
            }`}
            onClick={() => onConfirm(message)}
            type="button"
            disabled={!message.trim() || loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Close Thread"
            )}
          </button>
          <button
            className="px-4 py-2 rounded-full bg-blue-600 text-white "
            onClick={onClose}
            type="button"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
