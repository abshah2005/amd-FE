import React from "react";

const stats = [
  { label: "Total Users", value: "1040" },
  { label: "Active Users", value: "24" },
  { label: "Total Platform Earnings", value: "$7500" },
  { label: "Avg. Rating", value: "4.5 ★" },
];

const DashboardStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 w-full max-w-[1100px] mx-auto">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm"
      >
        <span className="text-base text-gray-500 mb-2 font-medium">{stat.label}</span>
        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
      </div>
    ))}
  </div>
);

export default DashboardStats;