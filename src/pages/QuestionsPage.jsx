import React, { useState } from "react";
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
  questions.map((q) => ({
    id: q._id,
    submittedDate: new Date(q.createdAt).toISOString().slice(0, 10),
    question: q.title,
    professional: { name: q.professional?.user?.fullName || "Professional" },
    price: q.price || "—",
    status: getStatusLabel(q.status),
    deliveryTime: q.deliveryType,
  }));

const mappedAnswers = (answers) =>
  answers.map((a) => ({
    id: a._id,
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
  const activeStatuses = [
    "approved",
    "submitted",
    "quoted",
    "awaiting_response",
    "awaiting_payment",
    "paid",
    "in_thread",
  ];

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
              answers={filteredItems}
              setModalOpen={(id) => handleOpenQuestion(id)}
            />
          ) : (
            <QuestionsTable
              questions={filteredItems}
              //               setModalOpen={(id) => {
              //               handleOpenQuestion(id)
              // console.log("Question ID passed to setModalOpen:", id);
              //               }
              //             }
              setModalOpen={(id) => handleOpenQuestion(id)}
            />
          )}
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
      />
    </div>
  );
};

export default QuestionsPage;
