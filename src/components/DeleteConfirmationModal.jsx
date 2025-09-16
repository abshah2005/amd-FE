import React from "react";

export default function DeleteConfirmationModal({
  open,
  title,
  description,
  error,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onClose = () => {},
  onConfirm = () => {},
  confirmClassName = "px-4 py-2 rounded bg-red-600 text-white",
  cancelClassName = "px-4 py-2 rounded bg-gray-200",
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-700 mb-4">{description}</p>}
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={cancelClassName}
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={confirmClassName}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading  ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}