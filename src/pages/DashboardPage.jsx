import React, { useState } from "react";
import DashboardStats from "../components/DashboardStats";
import DashboardTabs from "../components/DashboardTabs";
import DashboardTable from "../components/DashboardTable";

const professionalsData = [
  { name: "Alex Hales", joined: "YYYY/MM/DD", earnings: "$25", answers: 23, status: "Active" },
  { name: "Peter Parker", joined: "YYYY/MM/DD", earnings: "$25", answers: 23, status: "Active" },
  { name: "Peter Parker", joined: "YYYY/MM/DD", earnings: "$25", answers: 23, status: "Active" },
];

const askersData = [
  { name: "Alex Hales", joined: "YYYY/MM/DD", spendings: "$25", questions: 23, status: "Active" },
  { name: "Peter Parker", joined: "YYYY/MM/DD", spendings: "$25", questions: 23, status: "Active" },
  { name: "Peter Parker", joined: "YYYY/MM/DD", spendings: "$25", questions: 23, status: "Active" },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Professionals");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      
      <div className="w-full flex justify-center">
        <DashboardStats />
      </div>
      <div className="w-[1100px] max-w-full mx-auto mt-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 ml-3">Users</h1>
        <DashboardTabs
          tabs={["Professionals", "Asker"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-2">
          <DashboardTable
            type={activeTab}
            data={activeTab === "Professionals" ? professionalsData : askersData}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;