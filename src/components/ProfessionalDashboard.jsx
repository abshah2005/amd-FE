import React, { useEffect, useState } from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";

const demoStats = {
  activeQuestions: "03",
  questionsCompleted: "13",
  avgRating: "4.5",
  totalEarnings: "$750",
};

const demoShareUrl = "www.askmedirect.com/theprofessional_12";

const demoActiveQuestions = [
  {
    text: "Looking for guidance on how to structure my investor pitch.",
    daysLeft: 5,
  },
  {
    text: "Looking for guidance on how to structure my investor pitch.",
    daysLeft: 10,
  },
  {
    text: "Looking for guidance on how to structure my investor pitch.",
    daysLeft: 12,
  },
];

const demoPendingAnswers = [
  {
    id: "Qno. 1a",
    submittedDate: "YYYY/MM/DD",
    question: "Looking for guidance on how to structure my investor pitch.",
    asker: "John Doe",
    price: "$25",
    status: "Awaiting Response",
    deliveryTime: "Normal",
  },
];

function StatsCard({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-3 text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ShareBox({ url }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <div className="text-sm font-medium text-gray-800">
        Sharable Profile Link
      </div>
      <div className="mt-3 text-xs text-gray-500 break-words">{url}</div>
      <div className="mt-4 flex justify-end">
        <button className="text-sm px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50">
          Copy URL
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
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-800 mt-1" />
            <div>
              <div className="text-xs text-gray-500">
                {it.daysLeft} days remaining
              </div>
              <div className="text-sm text-gray-700 mt-1">{it.text}</div>
            </div>
          </li>
        ))}
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
  const map = {
    Accepted: "text-green-600",
    Approved: "text-blue-600",
    "Awaiting Response": "text-yellow-600",
    Declined: "text-red-600",
  };
  return <span className={map[status] || "text-gray-600"}>{status}</span>;
}

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("Active");
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // replace with real API call later: e.g. /api/professional/:id/dashboard
        await new Promise((r) => setTimeout(r, 200));
        if (mounted) setPending(demoPendingAnswers);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [user]);

  const filtered = pending.filter((it) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      (it.question || "").toLowerCase().includes(s) ||
      (it.asker || "").toLowerCase().includes(s) ||
      (it.id || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className=" bg-white pt-0 ">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-0">
          {/* Left Sidebar */}
          <aside className="col-span-3 pl-8  border-r  min-h-[80vh] ">
            <div className="mt-8">

            <SidebarList items={demoActiveQuestions} />
            </div>

          </aside>

          {/* Right Main Content */}
          <main className="col-span-9 pl-8 p-4">
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-2xl font-semibold mt-4">Dashboard</h1>
              <div className="w-80 ">
                <ShareBox url={demoShareUrl} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Active Questions"
                value={demoStats.activeQuestions}
              />
              <StatsCard
                title="Question Completed"
                value={demoStats.questionsCompleted}
              />
              <StatsCard title="Avg. Rating" value={demoStats.avgRating} />
              <StatsCard
                title="Total Earnings"
                value={demoStats.totalEarnings}
              />
            </div>

            <section>
              <h2 className="text-xl font-semibold mb-4">Pending Actions</h2>
              <div className="bg-white rounded-[12px] border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <TabsBar active={tab} setActive={setTab} />
                    <SearchInput
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-4 overflow-x-auto">
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
                        {filtered.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                              {row.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.submittedDate}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 max-w-lg truncate">
                              {row.question}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.asker}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <StatusCell status={row.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {row.deliveryTime}
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
    </div>
  );
}
