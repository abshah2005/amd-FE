import React from "react";

export default function ScheduledDeletionModal({
  open,
  scheduledAt, // Date or string
  timeLeftText = "",
  error,
  onClose = () => {},
  onCancelDeletion = () => {},
  cancelling = false,
}) {
  if (!open) return null;

  const formatted = scheduledAt ? new Date(scheduledAt).toLocaleString() : null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-lg font-semibold mb-2 text-red-600">
          Professional profile scheduled for deletion
        </h2>
        {formatted && (
          <p className="text-sm text-gray-700 mb-2">
            Your professional profile is scheduled to be permanently deleted on{" "}
            <strong>{formatted}</strong>.
          </p>
        )}
        {/* <p className="text-sm text-gray-700 mb-4">
          Time left until deletion: <strong>{timeLeftText || "—"}</strong>
        </p> */}

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
            disabled={cancelling}
          >
            Back
          </button>
          <button
            onClick={onCancelDeletion}
            className="px-4 py-2 rounded bg-gray-700 text-white"
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Deletion"}
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-3">
          If you cancel deletion you can continue using your professional profile and switch back to it via the role switch.
        </div>
      </div>
    </div>
  );
}