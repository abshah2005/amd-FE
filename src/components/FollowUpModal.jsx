import React, { useEffect, useRef, useState } from "react";

export default function FollowUpModal({ open, onClose, questionId, onSend }) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setBody("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSend = async () => {
    if (!body.trim()) return;
    setSending(true);
    try {
      // Placeholder: call API later. For now bubble up to parent.
      await Promise.resolve(); // simulate async
      onSend?.({ questionId, body: body.trim() });
      onClose?.();
    } catch (err) {
      console.error("Follow-up send failed", err);
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Add a Follow-up (Within 48 Hours)</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          You can ask a follow-up related to your original question for the next 48 hours.
          After that, the thread will be closed. For new or unrelated topics, please create a new question.
        </p>

        <textarea
          ref={inputRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start typing here...."
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <hr className="my-4 shadow" />

        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 text-gray-700"
            onClick={onClose}
            type="button"
            disabled={sending}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded-full text-white ${body.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
            onClick={handleSend}
            type="button"
            disabled={!body.trim() || sending}
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}