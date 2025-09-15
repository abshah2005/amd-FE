import React, { useEffect, useState } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import {
  useProfessionalStats,
  usePendingQuestions,
} from "../hooks/useDashboard";
import { getStatusLabel } from "../utils/StatusUtil";
import QuestionThreadModal from "./QuestionThreadModal";
import PendingPayoutsCard from "./PendingPayoutsCard";

function StatsCard({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-3 text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ShareBox({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!url) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative bg-white border rounded-lg p-4 shadow-sm">
      {/* info icon top-right */}
      <div className="absolute top-3 right-3">
        <div
          title="Please feel free to share this link with your own audience and followers to start accepting questions on AskMeDirect.com"
          className="w-7 h-7 flex items-center justify-center rounded-full border text-gray-500 bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-1a1 1 0 112 0v3a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="text-sm font-medium text-gray-800">
        Sharable Profile Link
      </div>

      <div className="mt-4 flex gap-4 justify-around items-center">
        <div className=" text-xs text-black font-bold break-words">
          {url || "—"}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-sm px-3 py-1 border rounded-full text-blue-600 hover:bg-blue-50"
          aria-label={copied ? "URL copied" : "Copy URL"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span className="font-medium">{copied ? "Copied" : "Copy URL"}</span>
        </button>
      </div>
    </div>
  );
}

function SidebarList({ items }) {
  return (
    <div className=" pr-6">
      <h3 className="text-lg font-semibold mb-4">Active Questions</h3>
      <ul className="text-sm space-y-6">
        {items.slice(0, 6).map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-800 mt-1" />
            <div>
              <div className="text-xs text-gray-500">
                {(() => {
                  const today = new Date();
                  const answerBy = new Date(it.answerBy);
                  const diff = Math.ceil(
                    (answerBy - today) / (1000 * 60 * 60 * 24)
                  );
                  if (isNaN(diff)) return "Time is yet to be decided";
                  return `${diff} days remaining`;
                })()}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {it.body.slice(0, 40) + "..."}
              </div>
            </div>
          </li>
        ))}
        {items.length - 6 > 0 && (
          <li className="text-sm text-gray-500">
            and {items.length - 6} more...
          </li>
        )}
      </ul>
    </div>
  );
}

function TabsBar({ active, setActive }) {
  return (
    <div className="flex items-center gap-4">
      {["Active", "Archived"].map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`text-sm ${
            active === t
              ? "text-blue-600 border-b-2 border-blue-600 pb-2"
              : "text-gray-600"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="w-80">
      <input
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="w-full border rounded-full px-4 py-2 text-sm placeholder-gray-400"
      />
    </div>
  );
}

function StatusCell({ status }) {
  const label = getStatusLabel(status);
  const map = {
    Pending: "text-yellow-600",
    Approved: "text-blue-600",
    Rejected: "text-red-600",
    Quoted: "text-purple-600",
    "Awaiting Payment": "text-orange-600",
    Paid: "text-green-600",
    "Awaiting Response": "text-yellow-600",
    Answered: "text-blue-700",
    Ongoing: "text-indigo-600",
    Completed: "text-green-700",
    Cancelled: "text-gray-500",
  };
  return <span className={map[label] || "text-gray-600"}>{label}</span>;
}

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Fetch stats and pending questions
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useProfessionalStats();
  const { data: pending, isLoading: loading, error } = usePendingQuestions();

  // Only show items whose status is NOT closed or rejected
  // const filtered = (pending || []).filter(
  //   (it) =>
  //     it.status !== "closed" &&
  //     it.status !== "rejected" &&
  //     (!q ||
  //       (it.question || "").toLowerCase().includes(q.toLowerCase()) ||
  //       (it.asker?.user?.firstName || it.asker?.firstName || it.asker || "")
  //         .toLowerCase()
  //         .includes(q.toLowerCase()) ||
  //       (it.id || "").toLowerCase().includes(q.toLowerCase()))
  // );
  const filtered = (pending || [])
    .filter(
      (it) =>
        it.status !== "closed" &&
        it.status !== "rejected" &&
        (!q ||
          (it.question || "").toLowerCase().includes(q.toLowerCase()) ||
          (it.asker?.user?.firstName || it.asker?.firstName || it.asker || "")
            .toLowerCase()
            .includes(q.toLowerCase()) ||
          (it.id || "").toLowerCase().includes(q.toLowerCase()))
    )
    .map((it, index) => ({
      ...it,
      label: `Qno.${index + 1}`, // Add a label property
    }));

  const handleRowClick = (id) => {
    setSelectedQuestionId(id); // Set the selected question ID
    setModalOpen(true); // Open the modal
  };

  return (
    <div className=" bg-white pt-0 ">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-0">
          {/* Left Sidebar */}
          <aside className="col-span-3 pl-8  border-r  min-h-[80vh] ">
            <div className="mt-8">
              <SidebarList items={filtered || []} />
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="col-span-9 pl-8 p-4">
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-2xl font-semibold mt-4">Dashboard</h1>
              <div className="w-[45%] ">
                <ShareBox url={stats?.shareUrl || ""} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Active Questions"
                value={statsLoading ? "..." : stats?.activeQuestions ?? "0"}
              />
              <StatsCard
                title="Question Completed"
                value={statsLoading ? "..." : stats?.questionsCompleted ?? "0"}
              />
              <StatsCard
                title="Avg. Rating"
                value={
                  statsLoading ? "..." : (stats?.avgRating).toFixed(2) ?? "0"
                }
              />
              <StatsCard
                title="Total Earnings"
                value={statsLoading ? "..." : `$${stats?.totalEarnings ?? "0"}`}
              />
            </div>
            {stats?.pendingPayouts && stats.pendingPayouts.length > 0 && (
              <div className="mb-8">
                <PendingPayoutsCard
                  pendingPayouts={stats.pendingPayouts}
                  loading={statsLoading}
                  professional={stats.professionalActivationStatus}
                />
              </div>
            )}

            <section>
              <div className="bg-white rounded-[12px] border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="pt-2">
                      <h2 className="text-xl font-semibold mb-4">
                        Pending Actions
                      </h2>
                    </div>
                    <SearchInput
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                    />
                  </div>
                </div>
                <div className=" overflow-x-auto">
                  {loading ? (
                    <div className="text-center text-gray-600">Loading…</div>
                  ) : error ? (
                    <div className="text-center text-red-600">
                      Failed to load
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            QUESTION ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SUBMITTED DATE
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            QUESTION
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ASKER
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            PRICE
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            STATUS
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DELIVERY TIME
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.map((row, i) => (
                          <tr
                            key={row._id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleRowClick(row._id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                              {/* {row._id} */}
                              {`Qno.${i + 1}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(row.createdAt)
                                .toISOString()
                                .slice(0, 10)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 max-w-lg truncate">
                              {row.body.slice(0, 40) + "..."}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.asker?.user?.firstName ||
                                row.asker?.firstName ||
                                row.asker}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <StatusCell status={row.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.deliveryType}
                            </td>
                          </tr>
                        ))}
                        {filtered.length === 0 && (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-6 py-8 text-center text-sm text-gray-500"
                            >
                              No items to display
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <QuestionThreadModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedQuestionId(null);
        }}
        questionId={selectedQuestionId}
        // questionLabel={
        //   selectedQuestionId
        //     ? filtered.find((i) => i._id === selectedQuestionId)?.label
        //     : null
        // }
        questionLabel={
          selectedQuestionId
            ? filtered.find((i) => i._id === selectedQuestionId)?.label
            : null
        }
      />
    </div>
  );
}
