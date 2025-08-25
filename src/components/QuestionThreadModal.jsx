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

  // UI for professional viewing a submitted question
  const ProfessionalSubmittedView = () => (
    <div
      className="p-0 w-full
    "
    >
      {/* Header with question number and close button */}
      <div className="flex justify-between items-center p-4 border-b">
        <span className="font-semibold text-lg">Qno. {question.id}</span>
        {/* <button className="text-gray-500" onClick={onClose}>
          X
        </button> */}
      </div>

      {/* Instruction banner */}
      {showMessage && (
        <div className="w-full bg-gray-200">
          <div className="bg-gray-200 border-l-4 w-[98%] border-black p-3 flex justify-between items-center m-auto">
            <p className="text-sm text-gray-700">
              To quote a price, first change your status to 'Approved'. Then
              select your delivery time and enter your quote.
            </p>
            <button
              className="text-blue-600 text-sm"
              onClick={() => setShowMessage(false)} // Hide the message on click
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
            <tr className=" text-left text-xs text-gray-500">
              <th className="px-3 py-2">Submitted Date</th>
              <th className="px-3 py-2">Asker</th>
              <th className="px-3 py-2">Proposed budget</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Delivery Time</th>
              <th className="px-3 py-2">Fast Delivery</th>
              <th className="px-3 py-2">Payment Status</th>
              <th className="px-3 py-2 text-right">More</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td className="px-4 py-2">{question.submittedDate}</td>
              <td className="px-4 py-2">{question.asker}</td>
              <td className="px-4 py-2">${question.budget}</td>
              <td className="px-4 py-2">
                <div className="flex items-center text-yellow-500">
                  Awaiting Response
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
              <td className="px-4 py-2">
                <div className="flex items-center">
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
              <td className="px-4 py-2">
                <div className="flex items-center">
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
              <td className="px-4 py-2">N/A</td>
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
            price={question.budget} // Pass the budget or price
            status={"approved"} // Editable only if status is "approved"
            isPaid={status === "unpaid"} // Disable interactions if the question is paid
            onPriceChange={(newPrice) =>
              console.log("Price updated:", newPrice)
            } // Handle price changes
            onDone={() => console.log("Done clicked")} // Handle "Done" button click
          />
        </div>

        {/* Response area */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Answer</h2>
          <div className="  rounded-lg">
            {/* <LexicalEditor
              showDescription={false}
              value=""
              initialEditorState={null}
              onChange={() => {}}
              placeholder="Type your answer…"
              height={50}
              hideSubmitButton={true}
              autoFocus={false}
            /> */}

            <LexicalEditor
              value="hi lets this this questions thing"
              initialValue="hi lets this this questions thing"
              initialEditorState={JSON.parse(editorStateString)}
              onChange={() => {}}
              placeholder=""
              height={50}
              hideSubmitButton={true}
              autoFocus={false}
              readOnly={true}
              disabled={true}
            />
            <div className="flex justify-end mt-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">
            Close question thread
          </button>
        </div>

        {/* Activity section */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Activity</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-sm">
              Status: <span className="text-yellow-500">Awaiting Response</span>
            </span>
            <p className="text-sm mt-1">
              Your question has been received by the professional. You'll
              receive a response or custom quote soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // UI for asker viewing a submitted question (example)
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
          value={question.description}
          initialEditorState={null}
          onChange={() => {}}
          placeholder=""
          height={50}
          hideSubmitButton={true}
          autoFocus={false}
          readOnly={true}
        />
      </div>
      <div className="mb-4">
        <span className="font-medium text-gray-700">Attached Images</span>
        {renderImages(question.images)}
      </div>
      <div className="mt-6">
        <span className="font-semibold text-base">Activity</span>
        <div className="mt-2 bg-gray-50 rounded p-3 text-sm text-gray-700">
          Status: <span className="text-yellow-600">Awaiting Response</span>
          <br />
          You'll receive a response or custom quote soon.
        </div>
      </div>
    </div>
  );

  // Add more views for other status/role combinations as needed...

  // Main render logic
  let content;
  if (role === "professional" && status === "submitted") {
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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-0 relative overflow-y-auto max-h-[95vh]">
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
