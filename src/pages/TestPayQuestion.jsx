import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RZw0wC2esy5ycVXA0IRVWt5IaUHg5pb5ruGY4aOudbbxVhmyQGH7iIFekHUUB6FlLqIdHFgqgL9WlpKwP66NjFa00YkXl6p6G");

function PayForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStripePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    if (!stripe || !elements) {
      setStatus("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      setStatus("Stripe error: " + result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      setStatus("Payment succeeded!");
    } else {
      setStatus("Payment failed or incomplete.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleStripePay}>
      <CardElement options={{ hidePostalCode: true }} />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        type="submit"
        disabled={loading}
      >
        Pay with Stripe
      </button>
      {status && <div className="mt-4 text-sm text-blue-700">{status}</div>}
    </form>
  );
}

const TestPayQuestion = () => {
  const [questionId, setQuestionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setStatus("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data?.data?.clientSecret) {
        setClientSecret(data.data.clientSecret);
        setStatus("Client secret received. Enter card details below.");
      } else {
        setStatus(data?.message || "Failed to get client secret");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Elements stripe={stripePromise}>
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
          onClick={handlePay}
          disabled={loading || !questionId}
        >
          Get Stripe Client Secret
        </button>
        {clientSecret && <PayForm clientSecret={clientSecret} />}
        {status && <div className="mt-4 text-sm text-blue-700">{status}</div>}
      </div>
    </Elements>
  );
};

export default TestPayQuestion;