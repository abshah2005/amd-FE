import React from "react";

const DashboardTabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex gap-6 border-b border-gray-200 mb-2">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 font-medium text-sm ${
          activeTab === tab
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default DashboardTabs;