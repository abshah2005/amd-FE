import React, { useState } from "react";
import DashboardStats from "../components/DashboardStats";
import DashboardTabs from "../components/DashboardTabs";
import DashboardTable from "../components/DashboardTable";
import MainNav from "../components/MainNav";
import { useAuth } from "../contextProvider/AuthContextProvider";
import ProfessionalDashboard from "../components/ProfessionalDashboard";

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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Professionals");

  // If current activeRole is professional, show professional dashboard
  const isProfessional = user?.activeRole === "professional"  ;
  if (isProfessional) return <ProfessionalDashboard />;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      <div className="w-full flex mt-10 justify-center">
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