import React, { useState } from "react";
import LexicalEditor from "./RichTextEditor";
import PricingInput from "./PricingInput";

const QuestionThreadModal = ({
  open,
  onClose,
  role, // "asker" or "professional"
  status, // "submitted", "approved", etc.
  question, // { id, submittedDate, asker, professional, budget, deliveryTime, fastDelivery, images, description, responses }
}) => {
  const [showMessage, setShowMessage] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [editorState, setEditorState] = useState(null);
  const editorStateString = `{
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 1,
            "mode": "normal",
            "style": "",
            "text": "hi lets this this questions thing",
            "type": "text",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1,
        "textFormat": 1,
        "textStyle": ""
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1,
    "textFormat": 1
  }
}`;
  if (!open) return null;

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

  // Helper to combine and sort timeline and thread messages
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
    const sortedTimeline = [...timelineFeed].sort(
      (a, b) => new Date(b.at) - new Date(a.at)
    );
    const sortedThread = [...threadFeed].sort(
      (a, b) => new Date(b.at) - new Date(a.at)
    );

    // Return timeline first, then thread
    return [...sortedTimeline, ...sortedThread];
  };

  // UI for professional viewing a submitted question
  const ProfessionalSubmittedView = () => (
    <div
      className="p-0 w-full
    "
    >
      {/* Header with question number and close button */}
      <div className="flex justify-between items-center p-4 border-b">
        <span className="font-semibold text-lg">Qno. {question.id}</span>
      </div>

      {/* Instruction banner */}
      {question.status === "submitted" &&
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

      {/* Question details table */}
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse ">
          <thead>
            <tr className=" text-left text-xs text-gray-500 ">
              <th className="px-3 py-2 font-bold">Submitted Date</th>
              <th className="px-3 py-2  font-bold">Asker</th>
              <th className="px-3 py-2 font-bold">Proposed budget</th>
              <th className="px-3 py-2 font-bold">Status</th>
              <th className="px-3 py-2 font-bold">Delivery Time</th>
              <th className="px-3 py-2 font-bold">Fast Delivery</th>
              <th className="px-3 py-2 font-bold">Payment Status</th>
              <th className="px-3 py-2 font-bold text-right">More</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td className="px-3 py-2 font-bold">{question.submittedDate}</td>
              <td className="px-3 py-2 font-bold">{question.asker}</td>
              <td className="px-3 py-2 font-bold">${question.budget}</td>
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
              <td className="px-3 py-2">
                <div className="flex items-center font-bold">
                  {question.deliveryTime}
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
              <td className="px-3 py-2">
                <div className="flex items-center font-bold font-bold">
                  {question.fastDelivery}
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
              <td className="px-4 py-2 font-bold">N/A</td>
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
            initialMode="normal"
            price={status === "quoted" ? 30 : question.budget}
            status={status}
            role={role}
            priceRange="$25-$35"
            onPriceChange={(newPrice) =>
              console.log("Price updated:", newPrice)
            }
            onDone={() => console.log("Done clicked")}
          />
        </div>

        {/* Response area */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Answer</h2>
          <div className="  rounded-lg">
          
            <LexicalEditor
          value={null}
          initialEditorState={null}
          onChange={() => {}}
          placeholder=""
          height={50}
          hideSubmitButton={true}
          autoFocus={false}
          readOnly={false}
        />
            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setAnswer(editorValue)}
                disabled={!editorValue}
              >
                Send
              </button>
            </div>
          </div>
          {answer && (
            <div className="mt-6">
              <LexicalEditor
                initialEditorState={answer}
                readOnly={true}
                disabled={true}
                showDescription={false}
                hideSubmitButton={true}
                height={120}
              />
            </div>
          )}
        </div>
        <h2 className="font-semibold text-lg mb-3">Activity</h2>
        {question.feedback && (
          <div className="w-full flex flex-col items-center mb-6">
            <div className="bg-white rounded-lg  p-3 w-full max-w-xl mx-auto">
              <div className="flex justify-center items-center mb-2 text-center gap-4">
                <span className="font-semibold text-gray-700">
                  {question.feedback.user}
                </span>
                <span className="text-xs text-gray-400">
                  {question.feedback.date}
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
                {question.feedback.text}
              </div>
              <div className="flex items-center justify-center my-2 w-full">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-xs text-gray-500 font-semibold">
                  Thread Closed
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">
            Close question thread
          </button>
        </div>

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
                              : item.status === "payment_awaiting"
                              ? "text-orange-500"
                              : "text-gray-600"
                          }`}
                        >
                          Status:{" "}
                          {item.status === "submitted"
                            ? "Awaiting Response"
                            : item.status === "approved_and_quoted"
                            ? "Approved"
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
                        <p className="text-sm text-gray-700">{item.body}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AskerSubmittedView = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">Qno. {question.id}</span>
        <span className="text-xs text-gray-400">{question.submittedDate}</span>
      </div>
      <div className="mb-2 text-gray-700 text-sm bg-gray-50 p-2 rounded">
        Your question has been submitted. Awaiting professional's response.
      </div>
      <div className="mb-4">
        <LexicalEditor
          value={null}
          initialEditorState={null}
          onChange={() => {}}
          placeholder=""
          height={50}
          hideSubmitButton={true}
          autoFocus={false}
          readOnly={false}
        />
      </div>
      <div className="mb-4">
        <span className="font-medium text-gray-700">Attached Images</span>
        {renderImages(question.images)}
      </div>
      <div className="mt-6">
        <span className="font-semibold text-base">Activity</span>
        <div className="mt-2 bg-gray-50 rounded p-3 text-sm text-gray-700">
          Status: <span className="text-yellow-600">{status}</span>
          <br />
          You'll receive a response or custom quote soon.
        </div>
      </div>
    </div>
  );

  // Main render logic
  let content;
  // if (role === "professional" && status === "submitted") {
  //   content = <ProfessionalSubmittedView />;
  // }
  if (role === "professional" || role === "user") {
    content = <ProfessionalSubmittedView />;
  } else if (role === "asker" && status === "submitted") {
    content = <AskerSubmittedView />;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 w-full">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-0 relative overflow-y-auto max-h-[95vh]" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

export default QuestionThreadModal;
