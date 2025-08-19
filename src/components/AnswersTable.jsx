
import React from 'react';
export const AnswersTable = ({ answers }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Approved':
      case 'Answered':
        return 'text-green-600';
      case 'Declined':
        return 'text-red-600';
      case 'Awaiting Response':
      case 'Requested':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className=" w-full divide-y divide-gray-200">
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
                EST. DELIVERY TIME ↕
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {answers.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {a.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {a.submittedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <div className="truncate">{a.question}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {a.asker?.name || a.askerName || '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {a.proposedBudget || a.price || '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={getStatusColor(a.status)}>{a.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {a.deliveryTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
