import React, { useState, useEffect } from "react";
import { Tabs } from "../components/Tabs";
import { SearchBar } from "./SearcBar";
import AdminQuestionsTable from "../components/AdminQuestionsTable";
import {
  useAnswers,
  useQuestionsByUserType,
} from "../hooks/useQuestionsAndAnswers";
import { getStatusLabel } from "../utils/StatusUtil";
import QuestionThreadModal from "../components/QuestionThreadModal";
import { useLocation } from "react-router-dom";

const mappedAnswers = (answers) =>
  answers?.map((a, i) => ({
    id: a._id,
    label: `Qno.${i + 1}`,
    submittedDate: new Date(a.createdAt).toISOString().slice(0, 10),
    question: a.title,
    asker: { name: a.asker?.fullName || "Asker" },
    professional: { name: a.professional?.user?.fullName || "Professional" },
    price: a.price || "—",
    status: getStatusLabel(a.status),
    deliveryTime: a.deliveryType,
  }));

const AdminAnswersPage = () => {
  const location = useLocation();
  const { userType, userId, professionalName } = location.state || {};
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
  const archivedStatuses = ["closed", "rejected"];

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // Admin always fetches all answers (no user filter)
  const {
    data: activeItems,
    isLoading: loadingActive,
    isError: activeError,
  } = useQuestionsByUserType({ status: activeStatuses, userType, userId });

  const {
    data: archivedItems,
    isLoading: loadingArchived,
    isError: archivedError,
  } = useQuestionsByUserType({ status: archivedStatuses,userType, userId });

  const mappedActive = mappedAnswers(activeItems?.questions || []);
  const mappedArchived = mappedAnswers(archivedItems?.questions || []);

  const items = activeTab === "Active" ? mappedActive : mappedArchived;
  const loadingItems = activeTab === "Active" ? loadingActive : loadingArchived;
  const itemsError = activeTab === "Active" ? activeError : archivedError;

  const searchedItems = items.filter((it) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (it.question || "").toLowerCase().includes(s) ||
      (it.asker?.name || "").toLowerCase().includes(s) ||
      (it.professional?.name || "").toLowerCase().includes(s)
    );
  });

  const totalPages = Math.max(1, Math.ceil(searchedItems.length / pageSize));
  const paginatedItems = searchedItems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handleOpenQuestion = (id) => {
    setSelectedQuestionId(id);
    setModalOpen(true);
  };

  // simple flag state (client-side). Replace with API call if needed.
  const [flaggedIds, setFlaggedIds] = useState([]);
  const onFlagToggle = (id) => {
    setFlaggedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="md:w-[91%] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Admin — All Answers
        </h1>

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
              Failed to load answers
            </div>
          ) : (
            <AdminQuestionsTable
              questions={paginatedItems}
              setModalOpen={(id) => handleOpenQuestion(id)}
              onFlagToggle={onFlagToggle}
              flaggedIds={flaggedIds}
            />
          )}

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
            Showing {searchedItems.length} of {items.length} answers
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

export default AdminAnswersPage;
