import React, { useState } from "react";
import DashboardStats from "../components/DashboardStats";
import DashboardTabs from "../components/Dashboardtabs";
import DashboardTable from "../components/Dashboardtable";
import { useDashboardStats, useDashboardUsers } from "../hooks/useDashboard";
import { useAuth } from "../contextProvider/AuthContextProvider";
import ProfessionalDashboard from "../components/ProfessionalDashboard";
import { getStatusLabel } from "../utils/StatusUtil";

const PAGE_SIZE = 5;

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Professionals");
  const [page, setPage] = useState(1);

  // If current activeRole is professional, show professional dashboard
  if (user?.activeRole === "professional") return <ProfessionalDashboard />;

  // Fetch stats and users
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: professionals = [], isLoading: prosLoading } =
    useDashboardUsers("professional", page, PAGE_SIZE);
  const { data: askers = [], isLoading: askersLoading } = useDashboardUsers(
    "asker",
    page,
    PAGE_SIZE
  );

  // Pagination controls
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  const loading = activeTab === "Professionals" ? prosLoading : askersLoading;
  const data = activeTab === "Professionals" ? professionals : askers;

  const mappedProfessionals = professionals.map((row) => ({
    _id:row._id,
    userId: row.userId,
    name: row.name,
    joined: new Date(row.joinedDate).toISOString().slice(0, 10),
    earnings: row.totalEarnings,
    answers: row.questionsAnswered,
    status: getStatusLabel(row.status),
    featured: row.featured,
    verified: row.verified,
  }));

  const mappedAskers = askers.map((row) => ({
    userId: row.userId,
    name: row.name,
    joined: new Date(row.joinedDate).toISOString().slice(0, 10),
    spendings: row.totalSpendings,
    questions: row.questionsAsked,
    status: getStatusLabel(row.status),
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      <div className="w-full flex mt-10 justify-center">
        <DashboardStats stats={stats} loading={statsLoading} />
      </div>
      <div className="w-[1100px] max-w-full mx-auto mt-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 ml-3">Users</h1>
        <DashboardTabs
          tabs={["Professionals", "Askers"]}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setPage(1);
          }}
        />
        <div className="mt-2">
          <DashboardTable
            type={activeTab}
            data={
              activeTab === "Professionals" ? mappedProfessionals : mappedAskers
            }
            loading={loading}
            page={page}
            setPage={setPage}
          />
          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              className="px-4 py-1 rounded border bg-gray-50 text-gray-700 disabled:opacity-50"
              onClick={handlePrev}
              disabled={page === 1 || loading}
            >
              Prev
            </button>
            <span className="text-sm text-gray-500">Page {page}</span>
            <button
              className="px-4 py-1 rounded border bg-gray-50 text-gray-700 disabled:opacity-50"
              onClick={handleNext}
              disabled={data.length < PAGE_SIZE || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
