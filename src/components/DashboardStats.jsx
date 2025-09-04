import React from "react";

const DashboardStats = ({ stats, loading }) => {
  const statList = [
    { label: "Total Users", value: stats?.totalUsers ?? "-" },
    { label: "Active Users", value: stats?.activeUsers ?? "-" },
    { label: "Total Platform Earnings", value:  `$${stats?.totalPlatformEarnings}`  },
    { label: "Avg. Rating", value: `${(stats?.avgRating).toFixed(2)} ★` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 w-full max-w-[1100px] mx-auto">
      {statList.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm"
        >
          <span className="text-base text-gray-500 mb-2 font-medium">{stat.label}</span>
          <span className="text-3xl font-bold text-gray-900">
            {loading ? <span className="animate-pulse text-gray-300">...</span> : stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;