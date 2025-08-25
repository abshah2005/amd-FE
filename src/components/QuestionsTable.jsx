import React, { useState } from 'react';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';


export const QuestionsTable = ({ questions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'closed':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'submitted':
      case 'awaiting_response':
      case 'awaiting_payment':
      case 'paid':
      case 'in_thread':
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
                PROFESSIONAL ↕
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
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {question.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.submittedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <div className="truncate">
                    {question.question}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {question.professional.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={getStatusColor(question.status)}>
                    {question.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.deliveryTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
