import React from "react";

const Item = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-r-lg ${
      active
        ? "bg-[#EAF5FF] shadow-sm text-gray-900"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <span className="w-5 h-5 flex items-center justify-center text-gray-500">
      {icon}
    </span>
    <div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  </button>
);

const Sidebar = ({ tab, onChange, showPayments = true,user }) => {
  return (
    <aside className="bg-white lg:w-64 bg-gray-50 border-r w-full border-gray-100 p-6 flex-shrink-0">
      <nav className="flex flex-col gap-2">
        <Item
          active={tab === "profile"}
          onClick={() => onChange("profile")}
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1"
              />
            </svg>
          }
          label="Profile"
        />
        {user.activeRole==="professional" && (
          <Item
            active={tab === "payments"}
            onClick={() => onChange("payments")}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="2"
                  strokeWidth="1.5"
                />
                <path d="M2 10h20" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            label="Payments"
          />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
