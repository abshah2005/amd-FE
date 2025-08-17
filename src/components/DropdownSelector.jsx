import React, { useState, useRef, useEffect } from "react";

const DropdownSelector = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  multi = false,
  max = null,
  renderIcon = null,
  rounded = true,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (option) => {
    if (multi) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else if (!max || value.length < max) {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
      setOpen(false);
    }
  };

  const handleRemove = (option) => {
    if (multi) onChange(value.filter((v) => v !== option));
  };

  return (
    <div
      ref={ref}
      className={`relative border ${rounded ? "rounded-full" : " rounded"} px-4 py-2 bg-white flex items-center w-full`}
      style={{ minHeight: 44, cursor: disabled ? "not-allowed" : "pointer" }}
      tabIndex={0}
      onClick={() => !disabled && setOpen((v) => !v)}
    >
      {renderIcon && <span className="mr-2 text-gray-400">{renderIcon}</span>}
      {/* <div className="flex gap-2 flex-wrap flex-1">
        {multi && value.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}
        {multi
          ? value.map((option) => (
              <span
                key={option}
                className="flex items-center bg-blue-50 border border-blue-400 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {option}
                <button
                  type="button"
                  className="ml-1 text-blue-500 font-bold focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option);
                  }}
                >
                  &times;
                </button>
              </span>
            ))
          : (
            <span className="text-sm text-gray-700">
              {value || <span className="text-gray-400">{placeholder}</span>}
            </span>
          )
        }
      </div> */}
      <div
  className="flex gap-2 flex-nowrap flex-1 overflow-x-auto scrollbar-hide"
>
  {multi && value.length === 0 && (
    <span className="text-gray-400 text-sm">{placeholder}</span>
  )}
  {multi
    ? value.map((option) => (
        <span
          key={option}
          className="flex items-center bg-blue-50 border border-blue-400 text-blue-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
        >
          {option}
          <button
            type="button"
            className="ml-1 text-blue-500 font-bold focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(option);
            }}
          >
            &times;
          </button>
        </span>
      ))
    : (
      <span className="text-sm text-gray-700">
        {value || <span className="text-gray-400">{placeholder}</span>}
      </span>
    )
  }
</div>
      <span className="ml-auto text-gray-400">
        <svg width="20" height="20" fill="none">
          <path
            d="M6 8l4 4 4-4"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                multi
                  ? value.includes(option)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700"
                  : value === option
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
              disabled={multi && !value.includes(option) && max && value.length >= max}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelector;