import React from "react";

const AdminQuestionsTable = ({
  questions = [],
  setModalOpen,
  onFlagToggle = () => {},
  flaggedIds = [],
}) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "closed":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "submitted":
      case "awaiting_response":
      case "awaiting_payment":
      case "paid":
      case "in_thread":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QUESTION ID ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SUBMITTED DATE ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QUESTION
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ASKER ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PRICE ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                FLAG ↕
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EST. DELIVERY TIME ↕
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((q) => {
              const flagged = flaggedIds.includes(q.id);
              return (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>

                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium"
                    onClick={() => setModalOpen(q.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {q.label}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {q.submittedDate}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                    <div className="truncate">{q.question}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {q.asker?.name || q.professional?.name || "—"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {q.price || "—"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusColor(q.status)}>
                      {q.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          flagged ? "text-red-600" : "text-gray-500"
                        }`}
                      >
                        {flagged ? "Flagged" : "No flag"}
                      </span>
                      <button
                        onClick={() => onFlagToggle(q.id)}
                        className={`px-2 py-1 text-xs rounded border ${
                          flagged
                            ? "bg-red-50 border-red-300 text-red-700"
                            : "bg-white border-gray-200 text-gray-700"
                        }`}
                        aria-label={flagged ? "Unflag question" : "Flag question"}
                      >
                        {flagged ? "Unflag" : "Flag"}
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {q.deliveryTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuestionsTable;