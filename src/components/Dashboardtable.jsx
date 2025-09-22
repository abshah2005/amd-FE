import React, { useState } from "react";
import { useToggleProfessionalStatus } from "../hooks/userhooks";
import { useNavigate } from "react-router-dom";

const columns = {
  Professionals: [
    { label: "NAME", key: "name" },
    { label: "JOINED DATE", key: "joined" },
    { label: "TOTAL EARNINGS", key: "earnings" },
    { label: "NO. OF ANSWER", key: "answers" },
    { label: "STATUS", key: "status" },
    { label: "ACTIONS", key: "actions" },
  ],
  Askers: [
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
  const navigate = useNavigate();
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [professionalToFeature, setProfessionalToFeature] = useState(null);
  const [search, setSearch] = useState("");
  const toggleStatus = useToggleProfessionalStatus();

  const handleRowClick = (row) => {
    if (type === "Professionals") {
      navigate("/admin/questions", {
        state: {
          userType: "professional",
          userId: row._id,
          professionalName: row.name,
        },
      });
    } else {
      navigate("/admin/questions", {
        state: {
          userType: "asker",
          userId: row.userId,
          professionalName: row.name,
        },
      });
    }
  };

  // const handleToggleFeature = async (professionalId, currentFeatured) => {
  //   try {
  //     await toggleStatus.mutate({
  //       professionalId,
  //       featured: !currentFeatured,
  //     });
  //   } catch (error) {
  //     console.error("Failed to toggle feature status:", error);
  //   }
  // };

  const handleFeatureClick = (e, professionalId, currentFeatured) => {
    e.stopPropagation(); // Prevent row click event
    setProfessionalToFeature({ id: professionalId, currentFeatured });
    setFeatureModalOpen(true);
  };

  const handleToggleFeature = async () => {
    try {
      await toggleStatus.mutate({
        professionalId: professionalToFeature.id,
        featured: !professionalToFeature.currentFeatured,
      });
      setFeatureModalOpen(false);
      setProfessionalToFeature(null);
    } catch (error) {
      console.error("Failed to toggle feature status:", error);
    }
  };

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
                  {col.key !== "actions" && (
                    <span className="ml-1 text-gray-400">↕</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => handleRowClick(row)}
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                {columns[type].map((col) => {
                  if (col.key === "actions" && type === "Professionals") {
                    return (
                      <td key={col.key} className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* <button
                            onClick={() =>
                              handleToggleFeature(row._id, row.featured)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              row.featured
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                            disabled={toggleStatus.isPending}
                          >
                            {row.featured ? "✅ Featured" : "Feature"}
                          </button> */}
                          <button
                            onClick={(e) =>
                              handleFeatureClick(e, row._id, row.featured)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              row.featured
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                            disabled={toggleStatus.isPending}
                          >
                            {row.featured ? "✅ Featured" : "Feature"}
                          </button>
                          {row.verified && (
                            <span className="text-blue-600">✓ Verified</span>
                          )}
                        </div>
                      </td>
                    );
                  }

                  if (col.key === "status") {
                    return (
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
                    );
                  }

                  return (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm text-gray-900"
                    >
                      {row[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {featureModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-50 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              {professionalToFeature?.currentFeatured
                ? "Remove Featured Status"
                : "Confirm Feature"}
            </h2>
            <p className="text-gray-600 mb-6">
              {professionalToFeature?.currentFeatured
                ? "Are you sure you want to remove the featured status from this professional?"
                : "Are you sure you want to feature this professional?"}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setFeatureModalOpen(false);
                  setProfessionalToFeature(null);
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${
                  professionalToFeature?.currentFeatured
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={handleToggleFeature}
                disabled={toggleStatus.isPending}
              >
                {toggleStatus.isPending ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
