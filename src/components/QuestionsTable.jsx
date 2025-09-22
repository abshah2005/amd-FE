import React, { useState } from "react";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { DeleteQnModal } from "./DeleteQnModal";
import { useDeleteQuestion } from "../hooks/useQuestionsAndAnswers";

export const QuestionsTable = ({ questions, setModalOpen }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const { mutate:deleteQuestion , isPending:isLoading  } = useDeleteQuestion();

  const getStatusColor = (status) => {
    switch (status) {
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

  const handleDelete = (questionId) => {
    deleteQuestion(questionId, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setSelectedQuestion(null);
      },
    });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium"
                  onClick={() => setModalOpen(question.id)}
                  style={{ cursor: "pointer" }}
                >
                  {question.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {question.submittedDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <div className="truncate">{question.question}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {question?.professional?.name }
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {(question.status === "Submitted" ||
                    question.status === "Rejected" ||
                    question.status === "flagged") && (
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        setSelectedQuestion(question);
                        setDeleteModalOpen(true);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading && selectedQuestion?.id === question.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteModalOpen && (
        <DeleteQnModal
    open={deleteModalOpen} 
    onClose={() => setDeleteModalOpen(false)}
    onDiscard={() => setDeleteModalOpen(false)} 
    onDelete={() => handleDelete(selectedQuestion.id)} 
    isLoading={isLoading}// ✅ will call deleteQuestion
  />
      )}
    </div>
  );
};
