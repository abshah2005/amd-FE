import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrencySymbol } from "../utils/Constant";

// Stripe element styles to match your design
const stripeElementStyles = {
  base: {
    fontSize: "16px",
    color: "#32325d",
    "::placeholder": {
      color: "#a0aec0",
    },
  },
};

const PaymentModal = ({
  isOpen,
  onRequestClose,
  amount,
  questionId,
  deliveryType,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("US");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [currencies, setCurrencies] = useState([]);
  const [priceUSD, setPriceUSD] = useState(0);
  const [convertedPrice, setConvertedPrice] = useState(0);
  const queryClient = useQueryClient();

  const stripe = useStripe();
  const elements = useElements();

  // Call handlePay automatically when modal opens
  // useEffect(() => {
  //   if (isOpen && !clientSecret) {
  //     const handlePay = async () => {
  //       const token = localStorage.getItem("accessToken");
  //       const res = await fetch(
  //         `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}/pay`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({
  //             deliveryType,
  //             selectedCurrency,
  //           }),
  //         }
  //       );
  //       const data = await res.json();
  //       if (data?.data) {
  //         setClientSecret(data.data.clientSecret);
  //         setCurrencies(data.data.availableCurrencies || []);
  //         setPriceUSD(data.data.priceUSD);
  //         setConvertedPrice(data.data.priceInSelectedCurrency);
  //       } else {
  //         alert(data?.message || "Failed to get client secret");
  //       }
  //     };
  //     handlePay();
  //   }
  // }, [isOpen, clientSecret, questionId, deliveryType, selectedCurrency]);


  // Update the useEffect hook that loads initial data
useEffect(() => {
  if (isOpen && !clientSecret) {
    const handlePay = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryType,
            selectedCurrency,
          }),
        }
      );
      const data = await res.json();
      if (data?.data) {
        setClientSecret(data.data.clientSecret);
        setPriceUSD(data.data.priceUSD);
        
        // Save all available currencies
        const availableCurrencies = data.data.availableCurrencies || [];
        setCurrencies(availableCurrencies);
        
        // Set the initial converted price based on the first available currency
        if (availableCurrencies.length > 0) {
          // Find the current currency in available currencies
          const currencyData = availableCurrencies.find(
            c => c.code === selectedCurrency
          ) || availableCurrencies[0];
          
          // Update both selected currency and converted price
          setSelectedCurrency(currencyData.code);
          setConvertedPrice(currencyData.convertedAmount);
        }
      } else {
        alert(data?.message || "Failed to get client secret");
      }
    };
    handlePay();
  }
}, [isOpen, clientSecret, questionId, deliveryType]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);

    // Find the converted price for this currency
    const currencyData = currencies.find((c) => c.code === newCurrency);
    if (currencyData) {
      setConvertedPrice(currencyData.convertedAmount);
    }

    // Don't reset client secret - we'll update it without full re-render
    updatePaymentIntent(newCurrency);
  };

  // New function to update payment intent without full re-render
  const updatePaymentIntent = async (currencyCode) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryType,
            selectedCurrency: currencyCode,
          }),
        }
      );

      const data = await res.json();
      if (data?.data) {
        setClientSecret(data.data.clientSecret);
        setCurrencies(data.data.availableCurrencies || []);
        // Don't reset the entire form, just update the necessary values
      }
    } catch (error) {
      console.error("Error updating payment intent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (!stripe || !elements) {
      setStatus("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: cardholderName,
        address: {
          country: country,
        },
      },
    });

    if (error) {
      setStatus("Error: " + error.message);
      setLoading(false);
      return;
    }

    // Confirm payment with the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      setStatus("Payment failed: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setStatus("Payment succeeded!");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}/paid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await res.json();
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      onRequestClose();
      // You might want to close the modal or redirect after successful payment
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 "
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onRequestClose}
    >
      <div
        className="max-w-md w-full bg-white p-6 rounded shadow-lg relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Pay Now</h2>

        {/* Price information */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="font-medium">Question Price: ${priceUSD} USD</div>

          {/* Currency selector */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Payment Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code.toUpperCase()} -{" "}
                  {currency.convertedAmount} ({currency.code.toUpperCase()})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
  You'll be charged {currencies.find(c => c.code === selectedCurrency)?.symbol || '$'}{convertedPrice ? convertedPrice.toFixed(2) : '0.00'} in {selectedCurrency.toUpperCase()}
</p>
          </div>
        </div>

        {/* Rest of your payment form */}
        {!clientSecret ? (
          <div className="text-center py-8">
            <span className="text-gray-600">Loading payment form...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Information
              </label>
              <div className="border border-gray-300 rounded p-2">
                <CardNumberElement options={{ style: stripeElementStyles }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MM / YY
                </label>
                <div className="border border-gray-300 rounded p-2">
                  <CardExpiryElement options={{ style: stripeElementStyles }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC/CVV
                </label>
                <div className="border border-gray-300 rounded p-2">
                  <CardCvcElement options={{ style: stripeElementStyles }} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Full Name on Card"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country or region
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="Us">Us</option>
                <option value="Sc">SC</option>
                <option value="Wa">PK</option>
                <option value="In">IN</option>
              </select>
            </div>

            <hr className="my-4" />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Save this card for future payments
              </label>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              <p>
                <strong>Note:</strong> Make sure your payment information is
                correct before submitting. In case of a failed transaction, your
                question will not be answered by professional, and no funds will
                be held.
              </p>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {loading
                ? "Processing..."
                : `Pay ${
                    currencies.find((c) => c.code === selectedCurrency)
                      ?.symbol || "$"
                  }${convertedPrice ? convertedPrice.toFixed(2) : "0.00"}`}
            </button>

            {status && (
              <div
                className={`mt-4 text-sm ${
                  status.includes("succeeded")
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {status}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
