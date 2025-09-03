import React, { useState, useRef, useEffect } from "react";
import LexicalEditor from "./RichTextEditor";
import PricingInput from "./PricingInput";
import {
  useClose,
  useGetQuestion,
  usePostFollowUp,
  useUpdateQuestionStatus,
} from "../hooks/useQuestionsAndAnswers";
import { useAuth } from "../contextProvider/AuthContextProvider";
import FollowUpModal from "./FollowUpModal";
import DateTimePicker from "./DateTimePicker";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material"; // Import MUI components
import dayjs from "dayjs"; // If not installed, use new Date().toISOString()
import PaymentModal from "./PaymentModal";
import { usePostAnswer } from "../hooks/useQuestionsAndAnswers";
import ThreadClosureModal from "./ThreadClosureModal";
import FeedbackModal from "./FeedbackModal";
import { useLeaveFeedback } from "../hooks/useQuestionsAndAnswers";

const QuestionThreadModal = ({ open, onClose, questionId, questionLabel }) => {
  const [showMessage, setShowMessage] = useState(true);
  const [threadClosureOpen, setThreadClosureOpen] = useState(false);
  const [message, setMessage] = useState(""); // For final message input
  const [editorContent, setEditorContent] = useState(null);
  const [deliveryTimes, setDeliveryTimes] = useState({
    answerByNormal: null,
    answerByFast: null,
  });

  const [answer, setAnswer] = useState(null);
  const [quoteDate, setQuoteDate] = useState(null); // Date object
  const [quoteTime, setQuoteTime] = useState(null); // String "HH:mm"
  const [quoteAnswerBy, setQuoteAnswerBy] = useState("");
  const editorContentRef = useRef({
    html: null,
    plainText: null,
  });

  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState(null);

  const [followUpOpen, setFollowUpOpen] = useState(false); // added state
  const [datePickerOpen, setDatePickerOpen] = useState(false); // for testing DateTimePicker
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation modal
  const [actionType, setActionType] = useState(""); // State for dynamic action type
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const leaveFeedback = useLeaveFeedback();

  // Get current user from context
  const { user } = useAuth();
  console.log("Current question:", questionId);
  //its coming here 68adfd138541677930e780d2 perfectly

  // Fetch question data using the ID
  const { data: questionData, isLoading, error } = useGetQuestion(questionId);
  const useCloseHook = useClose();

  const updateQuestionStatus = useUpdateQuestionStatus();
  const [normalDeliveryTime, setNormalDeliveryTime] = useState(null);
  const [fastDeliveryTime, setFastDeliveryTime] = useState(null);
  const postFollowUp = usePostFollowUp();
  const postAnswer = usePostAnswer();
  // Determine role and status based on user and question data
  const role = user?.activeRole;
  const status = questionData?.status;

  // Create a formatted question object from API data
  const question = questionData
    ? {
        id: questionData._id,
        label: questionLabel,
        submittedDate: new Date(questionData.createdAt).toLocaleDateString(),
        payment: questionData.payment?.paid ? "Paid" : "Unpaid",
        asker: questionData.asker?.firstName || "Unknown",
        budget: questionData.price || questionData.proposedBudget || 0,
        deliveryType: questionData.deliveryType,
        priceRangeLow: questionData.professional.priceRangeLow,
        priceRangeHigh: questionData.professional.priceRangeHigh,
        proposedBudget: questionData.proposedBudget || 0,
        answerBy: questionData.answerBy || null,
        price: questionData.price,
        deliveryTime: questionData.answerByNormal
          ? questionData.answerByNormal
          : "N/A",
        fastDelivery: questionData.answerByFast
          ? questionData.answerByFast
          : "N/A",
        images: questionData.attachments || [],
        timeline: questionData.timeline || [],
        thread: questionData.thread || { messages: [] },
        description: questionData.body,
        feedback: questionData.feedback,
        quote: questionData.quote || null,
      }
    : null;

  const [initialType, setInitialType] = useState("normal");

  // const handleDateTimeApply = ({ date, ranges }) => {
  //   if (initialType === "normal") {
  //     const answerByNormal = ranges[0]?.end;
  //     if (!answerByNormal) {
  //       alert("Please select a valid normal delivery time.");
  //       return;
  //     }
  //     setDeliveryTimes((prev) => ({ ...prev, answerByNormal }));
  //     console.log("Normal Delivery Time applied:", { answerByNormal });
  //   } else if (initialType === "fast") {
  //     const answerByFast = ranges[0]?.end;
  //     if (!answerByFast) {
  //       alert("Please select a valid fast delivery time.");
  //       return;
  //     }
  //     setDeliveryTimes((prev) => ({ ...prev, answerByFast }));
  //     console.log("Fast Delivery Time applied:", { answerByFast });
  //   }
  //   setDatePickerOpen(false);
  // };

  // Combine date and time to ISO string
  useEffect(() => {
    if (quoteDate && quoteTime) {
      const combined = dayjs(quoteDate)
        .hour(Number(quoteTime.split(":")[0]))
        .minute(Number(quoteTime.split(":")[1]))
        .second(0)
        .millisecond(0)
        .utc()
        .format(); // "2025-08-27T13:00:00.000Z"
      setQuoteAnswerBy(combined);
    }
  }, [quoteDate, quoteTime]);

  const handleAction = (action) => {
    setActionType(action); // Set the action type dynamically
    setConfirmationOpen(true); // Open the confirmation modal
  };
  const handlePayNow = () => {
    setPaymentAmount(question.price); // or settledPrice, as needed
    setIsPaymentOpen(true);
  };
  const handleSendFollowUp = ({ questionId, body }) => {
    postFollowUp.mutate(
      { questionId, body },
      {
        onSuccess: () => {
          setFollowUpOpen(false);
        },
        onError: (err) => {
          console.error("Failed to send follow-up", err);
        },
      }
    );
  };

  const confirmAction = () => {
    updateQuestionStatus.mutate(
      { id: questionId, action: actionType, payload: {} },
      {
        onSuccess: () => {
          console.log(`${actionType} action completed successfully`);
          setConfirmationOpen(false); // Close the modal on success
        },
        onError: (error) => {},
      }
    );
  };

  const handleThreadClosure = () => {
    useCloseHook.mutate(
      { questionId, body: message },
      {
        onSuccess: () => {
          console.log("Thread closed successfully");
          setThreadClosureOpen(false);
          setMessage(""); // Reset message
        },
        onError: (error) => {
          console.error("Failed to close thread:", error);
        },
      }
    );
  };

  const handleQuote = ({ amount, answerBy }) => {
    updateQuestionStatus.mutate(
      {
        id: questionId,
        action: "quote",
        payload: { amount, answerBy },
      },
      {
        onSuccess: () => {
          console.log("Quote submitted");
        },
        onError: (error) => {
          console.error("Quote failed:", error);
        },
      }
    );
  };

  if (!open) return null;

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 relative">
          <p className="text-lg">Loading question data...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 relative">
          <p className="text-lg text-red-600">Failed to load question data.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Helper to render images from src links
  const renderImages = (images) => (
    <div className="flex gap-3 mt-2">
      {images.map((imgSrc, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <img
            src={imgSrc}
            alt={`Image ${idx + 1}`}
            className="w-20 h-20 rounded object-cover bg-gray-100"
          />
          <span className="text-xs text-gray-800 mt-1">Image {idx + 1}</span>
          <button
            className="mt-1 px-2 py-1 bg-gray-100 rounded text-xs"
            onClick={() => window.open(imgSrc, "_blank")}
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );

  const getActivityFeed = () => {
    // Timeline events
    const timelineFeed = (question.timeline || []).map((event) => ({
      type: "timeline",
      at: event.at,
      status: event.status,
      note: event.note,
      by: event.by,
      _id: event._id,
    }));

    // Thread messages
    const threadFeed = (question.thread?.messages || []).map((msg, idx) => ({
      type: "thread",
      at: msg.createdAt,
      role: msg.role,
      body: msg.body,
      sender: msg.role === "asker" ? question.asker : "Professional",
      isFollowUp: msg.isFollowUp,
      _id: msg._id || idx,
    }));

    // Sort timeline and thread separately (latest first)
    // const sortedTimeline = [...timelineFeed].sort(
    //   (a, b) => new Date(b.at) - new Date(a.at)
    // );
    // const sortedThread = [...threadFeed].sort(
    //   (a, b) => new Date(b.at) - new Date(a.at)
    // );

    const combinedFeed = [...timelineFeed, ...threadFeed].sort(
      (a, b) => new Date(b.at) - new Date(a.at)
    );
    // Return timeline first, then thread
    return combinedFeed;
  };

  // UI for professional viewing a submitted question
  const ProfessionalSubmittedView = () => (
    <div className="p-0 w-full">
      {/* Header with question number and close button */}
      <div className="flex justify-between items-center p-4 border-b">
        <span className="font-semibold text-lg">{question.label}</span>
      </div>

      {/* Instruction banner */}
      {role === "professional" &&
        status === "submitted" &&
        status !== "approved" &&
        showMessage && (
          <div className="w-full bg-gray-200">
            <div className="bg-gray-200 border-l-4 w-[98%] border-black p-3 flex justify-between items-center m-auto">
              <p className="text-sm text-gray-700">
                To quote a price, first change your status to 'Approved'. Then
                select your delivery time and enter your quote.
              </p>
              <button
                className="text-blue-600 text-sm"
                onClick={() => setShowMessage(false)}
              >
                dismiss
              </button>
            </div>
          </div>
        )}
      {role === "professional" && status === "submitted" && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
            onClick={() => handleAction("approve")} // Trigger the confirmation modal
          >
            Approve Question
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
            onClick={() => handleAction("reject")}
          >
            Reject Question
          </button>
        </div>
      )}

      {/* Question details table */}
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse ">
          <thead>
            <tr className=" text-left text-xs text-gray-500 ">
              <th className="px-3 py-2 font-bold">Submitted Date</th>
              <th className="px-3 py-2  font-bold">Asker</th>
              <th className="px-3 py-2 font-bold">Proposed budget</th>
              <th className="px-3 py-2 font-bold">Status</th>
              {[
                "approved",
                "rejected",
                "quoted",
                "awaiting_payment",
                "payment_awaiting",
              ].includes(status) && (
                <>
                  <th className="px-3 py-2 font-bold">Normal Delivery </th>
                  <th className="px-3 py-2 font-bold">Fast Delivery</th>
                </>
              )}

              {["paid", "in_thread", "answered", "closed"].includes(status) && (
                <th className="px-3 py-2 font-bold">Delivery Time</th>
              )}
              <th className="px-3 py-2 font-bold">Payment Status</th>
              <th className="px-3 py-2 font-bold text-right">More</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td className="px-3 py-2 font-bold">{question.submittedDate}</td>
              <td className="px-3 py-2 font-bold">{question.asker}</td>
              <td className="px-3 py-2 font-bold">
                ${question.proposedBudget}
              </td>
              <td className="px-2 py-2">
                <div className="flex items-center text-yellow-500 ">
                  {status}
                  <svg
                    className="ml-1 w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
              
              {[
                "approved",
                "rejected",
                "quoted",
                "awaiting_payment",
                "payment_awaiting",
              ].includes(status) && (
                <>
                  <td className="px-3 py-2">
                <div className="flex items-center font-bold">
                  {status === "submitted" ||
                  status === "approved" ||
                  status === "rejected"
                    ? "N/A"
                    : normalDeliveryTime?.answerByNormal
                    ? new Date(
                        normalDeliveryTime?.answerByNormal
                      ).toLocaleDateString()
                    : question.deliveryTime
                    ? new Date(question.deliveryTime).toLocaleDateString()
                    : "N/A"}

                  <svg
                    className="ml-1 w-4 h-4"
                    onClick={() => {
                      if (status === "approved" && role === "professional") {
                        setInitialType("normal");
                        setDatePickerOpen(true);
                      }
                    }}
                    cursor={"pointer"}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center font-bold font-bold">
                  
                  {status === "submitted" ||
                  status === "approved" ||
                  status === "rejected"
                    ? "N/A"
                    : fastDeliveryTime?.answerByFast
                    ? new Date(
                        fastDeliveryTime?.answerByFast
                      ).toLocaleDateString()
                    : question.fastDelivery
                    ? new Date(question.fastDelivery).toLocaleDateString()
                    : "N/A"}
                  <svg
                    className="ml-1 w-4 h-4"
                    onClick={() => {
                      console.log("Status on fast click:", status);
                      if (status === "approved" && role === "professional") {
                        setInitialType("fast");
                        setDatePickerOpen(true);
                        console.log("Fast delivery time picker opened");
                      }
                    }}
                    cursor={"pointer"}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
                  
                </>
              )}


              {/* <td className="px-3 py-2">
                <div className="flex items-center font-bold">
                  {status === "submitted" ||
                  status === "approved" ||
                  status === "rejected"
                    ? "N/A"
                    : normalDeliveryTime?.answerByNormal
                    ? new Date(
                        normalDeliveryTime?.answerByNormal
                      ).toLocaleDateString()
                    : question.deliveryTime
                    ? new Date(question.deliveryTime).toLocaleDateString()
                    : "N/A"}

                  <svg
                    className="ml-1 w-4 h-4"
                    onClick={() => {
                      if (status === "approved" && role === "professional") {
                        setInitialType("normal");
                        setDatePickerOpen(true);
                      }
                    }}
                    cursor={"pointer"}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center font-bold font-bold">
                  
                  {status === "submitted" ||
                  status === "approved" ||
                  status === "rejected"
                    ? "N/A"
                    : fastDeliveryTime?.answerByFast
                    ? new Date(
                        fastDeliveryTime?.answerByFast
                      ).toLocaleDateString()
                    : question.fastDelivery
                    ? new Date(question.fastDelivery).toLocaleDateString()
                    : "N/A"}
                  <svg
                    className="ml-1 w-4 h-4"
                    onClick={() => {
                      console.log("Status on fast click:", status);
                      if (status === "approved" && role === "professional") {
                        setInitialType("fast");
                        setDatePickerOpen(true);
                        console.log("Fast delivery time picker opened");
                      }
                    }}
                    cursor={"pointer"}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td> */}
              {["paid", "in_thread", "answered", "closed"].includes(status) && (
                <th className="px-3 py-2 font-bold">
                  {new Date(question?.answerBy).toLocaleDateString()}
                </th>
              )}
              <td className="px-4 py-2 font-bold">{question.payment}</td>
              <td className="px-4 py-2 text-right">
                <svg
                  className="inline-block w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Question content */}
      <div className="p-3">
        <div className="flex gap-6">
          {/* Left Section: Description and Images */}
          <div className="flex-1">
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <p className="text-sm text-gray-700">{question.description}</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Attach Images
                </span>
              </div>
              <div className="flex gap-4">
                {question.images.map((imgSrc, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={
                        "https://1askmedirect1.s3.amazonaws.com/1755846448746_CJ.jpg"
                      }
                      alt={`Image ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="mt-1 text-xs text-center text-gray-600">
                      Image {idx + 1}
                    </div>
                    <div className="flex justify-center gap-1 mt-1">
                      <button className="p-1" title="Open fullsize">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                      <button className="p-1" title="Options">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PricingInput
            quote={question.quote}
            normalDeliveryTime={normalDeliveryTime}
            fastDeliveryTime={fastDeliveryTime}
            initialMode={question.deliveryType}
            price={question.price}
            status={status}
            questionId={questionId}
            role={role}
            priceRange={`$${question.priceRangeLow} - $${question.priceRangeHigh}`}
            onPriceChange={(newPrice) =>
              console.log("Price updated:", newPrice)
            }
            onDone={() => console.log("Done clicked")}
            onPayNow={handlePayNow}
          />
        </div>
        {!question.feedback && status === "closed" && role === "asker" && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold"
              onClick={() => setFeedbackOpen(true)}
            >
              Leave Feedback
            </button>
          </div>
        )}
        {/* Response area */}
        {["in_thread", "paid", "answered"].includes(status) &&
          user.activeRole === "professional" && (
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-3">Answer</h2>
              {answer && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: answer }}
                  ></div>
                </div>
              )}
              <div className="rounded-lg">
                <LexicalEditor
                  value={""}
                  initialEditorState={null}
                  onChange={(editorData) => {
                    editorContentRef.current = {
                      html: editorData.html,
                      plainText: editorData.plainText,
                    };
                  }}
                  placeholder="Type your answer here..."
                  height={150}
                  hideSubmitButton={true}
                  autoFocus={false}
                  readOnly={false}
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      setAnswer(editorContentRef.current.html);
                      console.log(
                        "Answer submitted (HTML):",
                        editorContentRef.current.html
                      );
                      console.log(
                        "Answer submitted (Plain text):",
                        editorContentRef.current.plainText
                      );
                      postAnswer.mutate({
                        questionId: questionId,
                        body: editorContentRef.current.html,
                      });
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        {/* </div> */}
        <h2 className="font-semibold text-lg mb-3">Activity</h2>
        {question.feedback && (
          <div className="w-full flex flex-col items-center mb-6">
            <div className="bg-white rounded-lg  p-3 w-full max-w-xl mx-auto">
              <div className="flex justify-center items-center mb-2 text-center gap-4">
                <span className="font-semibold text-gray-700">
                  {question.asker.firstName} {question.asker.lastName}.
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(question.feedback.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-center mb-2">
                {/* Star rating */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const full = i + 1 <= Math.floor(question.feedback.rating);
                  const half = !full && i + 0.5 <= question.feedback.rating;
                  return (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        full
                          ? "text-yellow-400"
                          : half
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill={
                        full
                          ? "currentColor"
                          : half
                          ? "url(#half)"
                          : "currentColor"
                      }
                      viewBox="0 0 20 20"
                    >
                      {half ? (
                        <>
                          <defs>
                            <linearGradient id="half">
                              <stop offset="50%" stopColor="#FACC15" />
                              <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"
                            fill="url(#half)"
                          />
                        </>
                      ) : (
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"
                          fill={full ? "#FACC15" : "#D1D5DB"}
                        />
                      )}
                    </svg>
                  );
                })}
              </div>
              <div className="mb-2 text-gray-700 text-center text-sm">
                {question.feedback.comment}
              </div>
            </div>
          </div>
        )}
        {status === "closed" && (
          <div className="flex items-center justify-center my-2 w-1/2 mx-auto">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-xs text-gray-500 font-semibold">
              Thread Closed
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>
        )}
        {user.activeRole === "professional" ? (
          <div className="mt-4 flex justify-center">
            <button
              className={`px-4 py-2 ${
                ["paid", "in_thread", "answered"].includes(status)
                  ? " bg-blue-600 text-white"
                  : "bg-gray-400 text-white"
              } rounded-full text-sm`}
              disabled={!["paid", "in_thread", "answered"].includes(status)}
              onClick={() => {
                setThreadClosureOpen(true);
              }}
            >
              Close question thread
            </button>
          </div>
        ) : (
          <div className="mt-4 flex justify-center">
            {/* quoted will be removed soon  */}
            {(() => {
              const allowFollowUp = ["paid", "in_thread", "answered"].includes(
                status.toLowerCase()
              );
              return (
                <button
                  className={`px-4 py-2 ${
                    allowFollowUp
                      ? "bg-blue-600 text-white"
                      : "bg-gray-400 text-white"
                  } rounded-full text-sm`}
                  disabled={!allowFollowUp}
                  onClick={() => {
                    // open DateTimePicker for testing
                    // setDatePickerOpen(true);
                    setFollowUpOpen(true);
                  }}
                >
                  Ask Follow Up Question
                </button>
              );
            })()}
          </div>
        )}
        {/* Activity section */}
        <div className="mt-8">
          {/* <h2 className="font-semibold text-lg mb-3">Activity</h2> */}
          <div className="flex flex-col gap-3">
            {getActivityFeed().map((item) => (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {item.type === "timeline" ? "AskMeDirect" : item.sender}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.at ? new Date(item.at).toLocaleDateString() : ""}
                  </span>
                </div>

                <div
                  key={item._id}
                  className="bg-gray-100 rounded-lg px-4 py-3"
                >
                  <div>
                    {item.type === "timeline" ? (
                      <>
                        <span
                          className={`block text-xs mb-1 ${
                            item.status === "answered" || item.status === "paid"
                              ? "text-blue-600"
                              : item.status === "submitted"
                              ? "text-yellow-600"
                              : item.status === "approved_and_quoted"
                              ? "text-green-600"
                              : item.status === "approved"
                              ? "text-green-600"
                              : item.status === "payment_awaiting"
                              ? "text-orange-500"
                              : "text-gray-600"
                          }`}
                        >
                          Status:{" "}
                          {item.status === "submitted"
                            ? "Awaiting Response"
                            : item.status === "approved"
                            ? "Approved"
                            : item.status === "approved_and_quoted"
                            ? "quoted"
                            : item.status === "answered"
                            ? "Completed"
                            : item.status === "paid"
                            ? "Completed"
                            : item.status === "payment_awaiting"
                            ? "Pending"
                            : item.status}
                        </span>
                        <p className="text-sm text-gray-700">{item.note}</p>
                      </>
                    ) : (
                      <>
                        <span className="block text-xs mb-1 text-gray-600">
                          Status:{" "}
                          {item.isFollowUp
                            ? "Follow up · Question asked"
                            : item.role === "professional"
                            ? "Completed"
                            : "Question asked"}
                        </span>
                        <p className="text-sm text-gray-700">
                          {item.body.includes("<") &&
                          item.body.includes(">") ? (
                            <span
                              dangerouslySetInnerHTML={{ __html: item.body }}
                            ></span>
                          ) : (
                            item.body
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DateTimePicker
          open={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          onApply={({ date, ranges }) => {
            if (initialType === "normal") {
              setNormalDeliveryTime({ answerByNormal: ranges[0]?.end });
              console.log("Normal Delivery Time applied:", {
                answerBy: ranges[0]?.end,
              });
            } else if (initialType === "fast") {
              setFastDeliveryTime({ answerByFast: ranges[0]?.end });
              console.log("Fast Delivery Time applied:", {
                answerBy: ranges[0]?.end,
              });
            }
            setDatePickerOpen(false);
          }}
        />
        <FollowUpModal
          open={followUpOpen}
          onClose={() => setFollowUpOpen(false)}
          questionId={questionId}
          onSend={handleSendFollowUp}
        />
        {/* <DateTimePicker
          open={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          onApply={handleDateTimeApply}
        /> */}

        <FeedbackModal
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          loading={leaveFeedback.isPending}
          onSubmit={({ rating, comment }) => {
            leaveFeedback.mutate(
              { questionId: question.id, rating, comment },
              {
                onSuccess: () => {
                  setFeedbackOpen(false);
                },
                onError: (error) => {
                  console.error("Failed to leave feedback:", error);
                },
              }
            );
          }}
        />
      </div>
    </div>
  );

  // Main render logic
  let content = null;
  // show the same detailed view for professional, user and asker so modal isn't empty
  if (["professional", "user", "asker"].includes(role)) {
    content = <ProfessionalSubmittedView />;
  } else {
    content = (
      <div className="p-8">
        <span className="text-lg font-semibold">
          No view available for this role/status.
        </span>
      </div>
    );
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 w-full"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-0 relative overflow-y-auto max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>

      <ThreadClosureModal
        open={threadClosureOpen}
        onClose={() => setThreadClosureOpen(false)}
        message={setMessage}
        loading={useCloseHook.isPending}
        onConfirm={handleThreadClosure}
      />

      {/* Confirmation Modal */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.8)", // Slightly opaque background
            backdropFilter: "blur(10px)", // Blur effect for glassmorphism
            borderRadius: "12px", // Rounded corners
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)", // Subtle shadow
            padding: "16px", // Padding for content
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "#333",
            textAlign: "center", // Center-align title
          }}
        >
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#555",
              fontSize: "0.95rem",
              textAlign: "center", // Center-align content
              marginBottom: "16px", // Space below text
            }}
          >
            Are you sure you want to <strong>{actionType}</strong> this
            question?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center", // Center-align buttons
            gap: "8px", // Space between buttons
          }}
        >
          <Button
            onClick={() => setConfirmationOpen(false)}
            sx={{
              color: "#fff",
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#d32f2f" },
              borderRadius: "8px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none", // Disable uppercase text
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            sx={{
              color: "#fff",
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
              borderRadius: "8px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none", // Disable uppercase text
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionThreadModal;
