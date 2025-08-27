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
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  const activeStatuses = [
    "approved",
    "submitted",
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
            <AnswersTable answers={filteredItems} setModalOpen={setModalOpen} />
          ) : (
            <QuestionsTable
              questions={filteredItems}
              setModalOpen={setModalOpen}
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
        onClose={() => setModalOpen(false)}
        role="professional"
        status="payment_awaiting"
        payment={{ ispaid: true, amount: 20 }}
        question={{
          // feedback: {
          //   // rating: 2,
          //   // text: "The answer is insightful and well-explained. It gave me the clarity I needed to move forward. A bit more detail on the legal implications would've made it perfect. Still, really helpful overall!",
          //   // date: "2025/02/01",
          //   // user: "John Doe",
          // },
          id: "1a",
          submittedDate: "YYYY/MM/DD",
          asker: "John Doe",
          budget: 20,
          deliveryTime: "Normal",
          fastDelivery: "2 days",
          images: [
            "https://yourdomain.com/image1.jpg",
            "https://yourdomain.com/image2.jpg",
          ],
          timeline: [
            {
              at: "2025-08-24T09:42:46.308Z",
              status: "submitted",
              by: "68a817210c101a6b024c846a",
              note: "Your question has been received by the professional. You'll receive a response or custom quote soon.",
              _id: "68aade960e21f50832c1bcb9",
            },
            {
              at: "2025-08-24T09:45:07.524Z",
              status: "approved_and_quoted",
              by: "68a819900c101a6b024c849e",
              note: "The price for the question is set to $20 from the professional.",
              _id: "68aadf23b505b24bce94bf94",
            },
            {
              at: "2025-08-24T09:49:05.830Z",
              status: "answered",
              by: "68a819900c101a6b024c849e",
              note: "Your question has been answered. You can ask a follow up question.",
              _id: "68aae011b25b1dce0678fd35",
            },
            {
              at: "2025-08-24T09:50:06.542Z",
              status: "in_thread",
              by: "68a817210c101a6b024c846a",
              note: "Follow-up question asked.",
              _id: "68aae04eb25b1dce0678fd3c",
            },
            {
              at: "2025-08-24T09:52:39.545Z",
              status: "followup_answered",
              by: "68a819900c101a6b024c849e",
              note: "Follow-up question answered.",
              _id: "68aae0e7b25b1dce0678fd51",
            },
            {
              at: "2025-08-26T09:43:59.442Z",
              status: "auto_closed_after_followup_window",
              by: "system",
              note: "Thread closed and payout sent.",
              _id: "68ad81dfe4fdfd8b0e3d05c7",
            },
          ],
          
          thread: {
            threadClosedEarlier: false,
            messages: [
              {
                sender: "68a819900c101a6b024c849e",
                role: "professional",
                body: "To optimize your website for SEO, start with keyword research, improve site speed, and ensure mobile responsiveness.",
                attachments: [],
                isFollowUp: false,
                createdAt: "2025-08-24T09:49:05.829Z",
              },
              {
                sender: "68a817210c101a6b024c846a",
                role: "asker",
                body: "Can you recommend any specific tools for keyword research?",
                attachments: [],
                isFollowUp: true,
                createdAt: "2025-08-24T09:50:06.541Z",
              },
              {
                sender: "68a819900c101a6b024c849e",
                role: "professional",
                body: "You can use tools like SEMrush, Ahrefs, or Google Keyword Planner for keyword research.",
                attachments: [],
                isFollowUp: true,
                createdAt: "2025-08-24T09:52:39.545Z",
              },
            ],
          },
          description:
            "What legal steps should I take before raising a seed round as a first-time founder?",
        }}
      />
    </div>
  );
};

export default QuestionsPage;
