import React, { useState,useEffect } from "react";
import { Tabs } from "../components/Tabs";
import { SearchBar } from "./SearcBar";
import { QuestionsTable } from "../components/QuestionsTable";
import AnswersTable from "../components/AnswersTable";
import { useAuth } from "../contextProvider/AuthContextProvider";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useQuestions, useAnswers } from "../hooks/useQuestionsAndAnswers";
import { getStatusLabel } from "../utils/StatusUtil";
import QuestionThreadModal from "../components/QuestionThreadModal";

const mappedQuestions = (questions) =>
  questions.map((q, i) => ({
    id: q._id,
    label: `Qno.${i + 1}`,
    submittedDate: new Date(q.createdAt).toISOString().slice(0, 10),
    question: q.title,
    professional: { name: q.professional?.user?.fullName || "Professional" },
    price: q.price || "—",
    status: getStatusLabel(q.status),
    deliveryTime: q.deliveryType,
  }));

const mappedAnswers = (answers) =>
  answers.map((a, i) => ({
    id: a._id,
    label: `Qno.${i + 1}`,
    submittedDate: new Date(a.createdAt).toISOString().slice(0, 10),
    question: a.title,
    asker: { name: a.asker?.fullName || "Asker" },
    price: a.price || "—",
    status: getStatusLabel(a.status),
    // deliveryTime: new Date(a.answerBy).toISOString().slice(0, 10),
    deliveryTime: a.deliveryType,
  }));

const QuestionsPage = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // New state for selected question ID
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const activeStatuses = [
    "approved",
    "submitted",
    "quoted",
    "awaiting_response",
    "awaiting_payment",
    "answered",
    "paid",
    "in_thread",
  ];

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const archivedStatuses = ["closed", "rejected"];

  const isProfessional = user?.activeRole === "professional";

  const {
    data: activeItems,
    isLoading: loadingActive,
    isError: activeError,
  } = isProfessional
    ? useAnswers({ status: activeStatuses })
    : useQuestions({ status: activeStatuses });

  // For archived tab
  const {
    data: archivedItems,
    isLoading: loadingArchived,
    isError: archivedError,
  } = isProfessional
    ? useAnswers({ status: archivedStatuses })
    : useQuestions({ status: archivedStatuses });

  // Map for table
  const mappedActive = isProfessional
    ? mappedAnswers(activeItems || [])
    : mappedQuestions(activeItems || []);

  const mappedArchived = isProfessional
    ? mappedAnswers(archivedItems || [])
    : mappedQuestions(archivedItems || []);

  const items = activeTab === "Active" ? mappedActive : mappedArchived;
  const loadingItems = activeTab === "Active" ? loadingActive : loadingArchived;
  const itemsError = activeTab === "Active" ? activeError : archivedError;

  console.log("Mapped items for table:", items);
  const filteredItems = items.filter((q) =>
    activeTab === "Active"
      ? q.status !== "Rejected" && q.status !== "Completed"
      : q.status === "Rejected" || q.status === "Completed"
  );
  // .filter(
  //   (question) =>
  //     (question.question || "")
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     (
  //       (isProfessional
  //         ? question.asker?.name
  //         : question.professional?.name) || ""
  //     )
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  // );

  console.log("Filtered items after search and status filter:", filteredItems);
  const title = isProfessional ? "My Answers" : "My Questions";

  // Create a handler for opening the modal with a question ID
  const handleOpenQuestion = (id) => {
    setSelectedQuestionId(id);
    setModalOpen(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen bg-white p-6">
      {isProfessional && (
        <div className="md:w-[91%] mx-auto flex items-center mb-2">
          <Link to={"/"}>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              aria-label="Back to Dashboard"
            >
              <ArrowBack fontSize="small" />
              <span className="font-medium">Back To Dashboard</span>
            </button>
          </Link>
        </div>
      )}

      <div className="md:w-[91%] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

        <Tabs
          tabs={["Active", "Archived"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="w-[100%] m-auto border border-gray-200 rounded-[24px]">
          <div className="p-4">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loadingItems ? (
            <div className="p-6 text-center text-gray-600">Loading…</div>
          ) : itemsError ? (
            <div className="p-6 text-center text-red-600">
              Failed to load {isProfessional ? "answers" : "questions"}
            </div>
          ) : isProfessional ? (
            <AnswersTable
              answers={paginatedItems}
              setModalOpen={(id) => handleOpenQuestion(id)}
            />
          ) : (
            <QuestionsTable
              questions={paginatedItems}
              setModalOpen={(id) => handleOpenQuestion(id)}
            />
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center px-4 py-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {items.length}{" "}
            {isProfessional ? "answers" : "questions"}
          </div>
        </div>
      </div>
      <QuestionThreadModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedQuestionId(null);
        }}
        questionId={selectedQuestionId}
        questionLabel={
          selectedQuestionId
            ? items.find((i) => i.id === selectedQuestionId)?.label
            : null
        }
      />
    </div>
  );
};

export default QuestionsPage;
