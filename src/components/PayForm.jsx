// filepath: src/components/PayForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PayForm = ({ clientSecret }) => {
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
};

export default PayForm;