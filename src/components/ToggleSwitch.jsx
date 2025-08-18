import React from 'react'

const ToggleSwitch = ({ checked = false, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={`relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch