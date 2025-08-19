import React, { useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import { SearchBar } from "./SearcBar";
import { QuestionsTable } from "../components/QuestionsTable";
import { AnswersTable } from "../components/AnswersTable";
import { useAuth } from "../contextProvider/AuthContextProvider";
import { ArrowBack } from "@mui/icons-material";

const questionData = [
  {
    id: "Qno. 1a",
    submittedDate: "2025/07/01",
    question:
      "What legal steps should I take before raising a seed round as a first-time founder?",
    professional: {
      name: "Alex Hales",
      profileUrl: "/profile/alex-hales",
      avatar: "/images/alex-hales.jpg",
    },
    proposedBudget: "$20",
    status: "Accepted",
    deliveryTime: "Normal",
    attachedImages: [
      { url: "/images/incorp-doc.jpg", label: "Image 1" },
      { url: "/images/founders-agreement.jpg", label: "Image 2" },
    ],
    answer: {
      text: `Before raising a seed round, you should ensure the following legal steps are in place:
1. Incorporation: Register your startup as a C-Corp (preferably in Delaware if you're in the US) or a Private Limited Company if you're elsewhere. Investors prefer a clean corporate structure.
2. Founders' Agreement: Clearly outline roles, equity split, vesting schedules, and what happens if a founder leaves.
3. Cap Table Clarity: Keep your capitalization table clean and updated—avoid early over-promises on equity.
4. IP Assignment: Ensure all intellectual property (code, branding, content) is assigned to the company, not held personally.
5. Data Room Prep: Have your legal documents organized—certificates of incorporation, bylaws, NDAs, employment contracts, and any existing SAFE/convertible notes.
6. Compliance: Ensure you're compliant with securities regulations when offering equity in exchange for funding.`,
      date: "2025/07/02",
      accepted: true,
    },
    activity: [
      {
        type: "session_closed",
        user: "John Doe",
        date: "2025/07/02",
        rating: 4,
        feedback: `The answer is insightful and well-explained. It gave me the clarity I needed to move forward. A bit more detail on the legal implications would've made it perfect. Still, really helpful overall!`,
      },
      {
        type: "status_update",
        status: "Accepted",
        by: "John Doe",
        date: "2025/07/02",
      },
    ],
  },
  {
    id: "Qno. 1b",
    submittedDate: "2025/07/03",
    question:
      "What legal steps should I take before raising a seed round as a first-time founder?",
    professional: {
      name: "Alex Hales",
      profileUrl: "/profile/alex-hales",
      avatar: "/images/alex-hales.jpg",
    },
    proposedBudget: "$20",
    status: "Approved",
    deliveryTime: "Normal",
    attachedImages: [
      { url: "/images/incorp-doc.jpg", label: "Image 1" },
      { url: "/images/founders-agreement.jpg", label: "Image 2" },
    ],
    answer: {
      text: `Before raising a seed round, you should ensure the following legal steps are in place:
1. Incorporation: Register your startup as a C-Corp or Private Limited Company.
2. Founders' Agreement: Clearly outline roles, equity split, vesting schedules, and what happens if a founder leaves.
3. Cap Table Clarity: Keep your capitalization table clean and updated.
4. IP Assignment: Ensure all intellectual property is assigned to the company.
5. Data Room Prep: Have your legal documents organized.
6. Compliance: Ensure you're compliant with securities regulations.`,
      date: "2025/07/04",
      accepted: false,
    },
    activity: [
      {
        type: "status_update",
        status: "Approved",
        by: "John Doe",
        date: "2025/07/04",
      },
    ],
  },
  {
    id: "Qno. 1c",
    submittedDate: "2025/07/05",
    question:
      "What legal steps should I take before raising a seed round as a first-time founder?",
    professional: {
      name: "Alex Hales",
      profileUrl: "/profile/alex-hales",
      avatar: "/images/alex-hales.jpg",
    },
    proposedBudget: "$20",
    status: "Declined",
    deliveryTime: "Normal",
    attachedImages: [
      { url: "/images/incorp-doc.jpg", label: "Image 1" },
      { url: "/images/founders-agreement.jpg", label: "Image 2" },
    ],
    answer: {
      text: "Question not answered yet.",
      date: "2025/07/06",
      accepted: false,
    },
    activity: [
      {
        type: "professional_feedback",
        status: "Declined",
        by: "Alex Hales",
        date: "2025/07/06",
        feedback: `I can't answer this question.`,
      },
      {
        type: "status_update",
        status: "Pending Payment",
        by: "AskMeDirect",
        date: "2025/07/06",
        feedback: `Your question has been received by the professional. You'll receive a response or custom quote soon.`,
      },
    ],
  },
  {
    id: "Qno. 1d",
    submittedDate: "2025/07/07",
    question: "How do I structure my pitch deck for investors?",
    professional: {
      name: "Emily Carter",
      profileUrl: "/profile/emily-carter",
      avatar: "/images/emily-carter.jpg",
    },
    proposedBudget: "$30",
    status: "Awaiting Response",
    deliveryTime: "Express",
    attachedImages: [],
    answer: {
      text: "",
      date: "",
      accepted: false,
    },
    activity: [
      {
        type: "status_update",
        status: "Awaiting Response",
        by: "AskMeDirect",
        date: "2025/07/07",
        feedback: `Your question has been received by the professional.`,
      },
    ],
  },
  {
    id: "Qno. 1e",
    submittedDate: "2025/07/08",
    question: "What are the best practices for remote team management?",
    professional: {
      name: "Robert Chen",
      profileUrl: "/profile/robert-chen",
      avatar: "/images/robert-chen.jpg",
    },
    proposedBudget: "$25",
    status: "Accepted",
    deliveryTime: "Normal",
    attachedImages: [{ url: "/images/remote-team.jpg", label: "Image 1" }],
    answer: {
      text: `1. Set clear expectations and goals.
2. Use effective communication tools.
3. Foster team culture with regular check-ins.
4. Provide feedback and recognition.
5. Ensure work-life balance.`,
      date: "2025/07/09",
      accepted: true,
    },
    activity: [
      {
        type: "session_closed",
        user: "Jane Smith",
        date: "2025/07/09",
        rating: 5,
        feedback: `Great advice! Helped me organize my remote team much better.`,
      },
      {
        type: "status_update",
        status: "Accepted",
        by: "Jane Smith",
        date: "2025/07/09",
      },
    ],
  },
];

// Dummy answers data (used for professional view demo)
const answersData = [
  {
    id: "A-1001",
    submittedDate: "2025/07/01",
    question: "How should I price my SaaS product at launch?",
    asker: {
      name: "John Doe",
      profileUrl: "/profile/john-doe",
      avatar: "/images/john-doe.jpg",
    },
    professional: {
      name: "Alex Hales",
      profileUrl: "/profile/alex-hales",
      avatar: "/images/alex-hales.jpg",
    },
    proposedBudget: "$50",
    status: "Awaiting Response",
    deliveryTime: "Normal",
    answer: {
      text: "Start with value-based tiers...",
      date: "2025/07/02",
      accepted: false,
    },
  },
  {
    id: "A-1002",
    submittedDate: "2025/07/03",
    question: "Can I patent an AI model?",
    asker: {
      name: "Jane Smith",
      profileUrl: "/profile/jane-smith",
      avatar: "/images/jane-smith.jpg",
    },
    professional: {
      name: "Alex Hales",
      profileUrl: "/profile/alex-hales",
      avatar: "/images/alex-hales.jpg",
    },
    proposedBudget: "$75",
    status: "Approved",
    deliveryTime: "Fast Track",
    answer: {
      text: "Patenting AI is possible when...",
      date: "2025/07/04",
      accepted: true,
    },
  },
  {
    id: "A-1003",
    submittedDate: "2025/07/05",
    question: "What agreements should founders sign early?",
    asker: {
      name: "Sam Green",
      profileUrl: "/profile/sam-green",
      avatar: "/images/sam-green.jpg",
    },
    professional: {
      name: "Emily Carter",
      profileUrl: "/profile/emily-carter",
      avatar: "/images/emily-carter.jpg",
    },
    proposedBudget: "$30",
    status: "Declined",
    deliveryTime: "Normal",
    answer: { text: "", date: "", accepted: false },
  },
];

const QuestionsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState(null);

  const isProfessional = user?.activeRole === "professional";

  const getUserDisplayName = () =>
    user?.fullName ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.name ||
    "";

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingItems(true);
      setItemsError(null);
      try {
        // In future replace this block with API calls:
        // if (isProfessional) { await fetch("/api/my-answers") } else { await fetch("/api/my-questions") }
        if (isProfessional) {
          // For demo: show all demo answers (no name filtering)
          const myAnswers = answersData.map((a) => ({
            ...a,
            answer: a.answer || {},
          }));
          if (mounted) setItems(myAnswers);
        } else {
          // Asker: show questions (current demo uses all questionData)
          if (mounted) setItems(questionData);
        }
      } catch (err) {
        if (mounted) setItemsError(err);
      } finally {
        if (mounted) setLoadingItems(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfessional, user]);

  // filter by activeTab and searchTerm (keeps original tab logic)
  const filteredItems = items
    .filter((q) =>
      activeTab === "Active"
        ? q.status !== "Declined" && q.status !== "Accepted"
        : q.status === "Declined" || q.status === "Accepted"
    )
    .filter(
      (question) =>
        // search both question text and professional/asker name
        (question.question || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (
          (isProfessional
            ? question.asker?.name
            : question.professional?.name) || ""
        )
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const title = isProfessional ? "My Answers" : "My Questions";

  return (
    <div className="min-h-screen  bg-white p-6">
      {isProfessional && (
        <div className="md:w-[91%] mx-auto flex items-center mb-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            aria-label="Back to Dashboard"
          >
            <ArrowBack fontSize="small" />
            <span className="font-medium">Back To Dashboard</span>
          </button>
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
            <AnswersTable answers={filteredItems} />
          ) : (
            <QuestionsTable questions={filteredItems} />
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {items.length}{" "}
            {isProfessional ? "answers" : "questions"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
