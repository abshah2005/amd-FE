import React, { useState } from "react";

const columns = {
  Professionals: [
    { label: "NAME", key: "name" },
    { label: "JOINED DATE", key: "joined" },
    { label: "TOTAL EARNINGS", key: "earnings" },
    { label: "NO. OF ANSWER", key: "answers" },
    { label: "STATUS", key: "status" },
  ],
  Asker: [
    { label: "NAME", key: "name" },
    { label: "JOINED DATE", key: "joined" },
    { label: "TOTAL SPENDINGS", key: "spendings" },
    { label: "NO. OF QUESTIONS", key: "questions" },
    { label: "STATUS", key: "status" },
  ],
};

const SearchBar = ({ value, onChange }) => (
  <div className="flex items-center mb-2 px-4 pt-4">
    <div className="relative w-[220px]">
      <span className="absolute left-3 top-2 text-gray-400">
        <svg width="16" height="16" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#A0AEC0" strokeWidth="2" />
          <path
            d="M11 11L15 15"
            stroke="#A0AEC0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="pl-8 pr-3 py-2 rounded-full border border-gray-200 bg-white text-sm w-full focus:outline-none"
      />
    </div>
  </div>
);

const DashboardTable = ({ type, data }) => {
  const [search, setSearch] = useState("");
  const filtered = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="border border-gray-200 rounded-2xl bg-white">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              {columns[type].map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {col.label}
                  <span className="ml-1 text-gray-400">↕</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                {columns[type].map((col) =>
                  col.key === "status" ? (
                    <td
                      key={col.key}
                      className={`px-6 py-4 text-sm font-medium cursor-pointer flex items-center ${
                        row.status ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {row.status ? "Active" : "Inactive"}
                      <svg
                        className="ml-1"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M3 5l3 3 3-3"
                          stroke={row.status ? "#2563eb" : "#a0aec0"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </td>
                  ) : (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm text-gray-900"
                    >
                      {row[col.key]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
