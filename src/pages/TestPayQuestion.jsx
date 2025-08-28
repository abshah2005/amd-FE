// filepath: src/pages/TestPayQuestion.jsx
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from "../components/PaymentModal";

const TestPayQuestion = () => {
  const [questionId, setQuestionId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState(10000); 

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Test Pay Question</h2>
      <label className="block mb-2 font-medium">Question ID</label>
      <input
        className="border px-3 py-2 rounded w-full mb-4"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        placeholder="Enter Question ID"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalIsOpen(true)}
      >
        Pay {amount /100}
      </button>
      <PaymentModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        amount={amount}
        questionId={questionId}
      />
    </div>
  );
};

export default TestPayQuestion;