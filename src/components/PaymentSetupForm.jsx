import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe("pk_test_51RZw0wC2esy5ycVXA0IRVWt5IaUHg5pb5ruGY4aOudbbxVhmyQGH7iIFekHUUB6FlLqIdHFgqgL9WlpKwP66NjFa00YkXl6p6G");


const PaymentSetupForm = ({ values, onChange, onNext, loading }) => {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    country: "England",
  });
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // Load Stripe instance
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };
    initializeStripe();
  }, []);

  // Stripe-based card validation
  const validateCardWithStripe = async () => {
    if (!stripe) {
      console.error("Stripe not loaded");
      return false;
    }

    const newErrors = {};

    try {
      // Parse expiry
      const [expMonth, expYear] = cardData.expiry.split(" / ");

      // Create card element data
      const cardElementData = {
        number: cardData.number.replace(/\s+/g, ""),
        exp_month: parseInt(expMonth, 10),
        exp_year: parseInt(`20${expYear}`, 10), // Convert YY to YYYY
        cvc: cardData.cvc,
      };

      // Validate card number
      const cardNumberValidation = stripe.validateCardNumber(
        cardElementData.number
      );
      if (!cardNumberValidation) {
        newErrors.number = "Invalid card number";
      }

      // Validate expiry
      const expiryValidation = stripe.validateExpiry(
        cardElementData.exp_month,
        cardElementData.exp_year
      );
      if (!expiryValidation) {
        newErrors.expiry = "Invalid expiry date";
      }

      // Validate CVC
      const cvcValidation = stripe.validateCVC(cardElementData.cvc);
      if (!cvcValidation) {
        newErrors.cvc = "Invalid CVC";
      }

      // Name validation
      if (!cardData.name.trim()) {
        newErrors.name = "Please enter the cardholder name";
      }

      // Additional checks - ensure expiry is not in the past
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (
        cardElementData.exp_year < currentYear ||
        (cardElementData.exp_year === currentYear &&
          cardElementData.exp_month < currentMonth)
      ) {
        newErrors.expiry = "Card has expired";
      }
    } catch (error) {
      console.error("Stripe validation error:", error);
      newErrors.general = "Card validation failed. Please check your details.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get card brand using Stripe
  const getCardBrand = (number) => {
    if (!stripe) return "unknown";

    const cleanNumber = number.replace(/\s+/g, "");
    if (cleanNumber.length < 6) return "unknown";

    // Use Stripe's card brand detection
    const cardBrand = stripe.cardBrand(cleanNumber);
    return cardBrand || "unknown";
  };

  // Enhanced validation with Stripe
  const validateForm = async () => {
    setIsValidating(true);

    try {
      const isValid = await validateCardWithStripe();
      return isValid;
    } catch (error) {
      setErrors({ general: "Validation service temporarily unavailable" });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // Your existing validation functions with improvements
  const validateExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/;
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split(" / ");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const cardYear = parseInt(year, 10);
    const cardMonth = parseInt(month, 10);

    if (
      cardYear < currentYear ||
      (cardYear === currentYear && cardMonth < currentMonth)
    ) {
      return false;
    }
    return true;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const cardBrand = getCardBrand(v);

    // Different formatting for different card types
    if (cardBrand === "american-express") {
      // Amex: 4-6-5 format
      const matches = v.match(/(\d{1,4})(\d{1,6})?(\d{1,5})?/);
      if (matches) {
        return [matches[1], matches[2], matches[3]].filter(Boolean).join(" ");
      }
    } else {
      // Standard: 4-4-4-4 format
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        return parts.join(" ");
      }
    }
    return v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "number") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (field === "cvc") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    setCardData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSaveCard = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    setIsValidating(true);

    try {
      // Simulate API call to save card
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newCard = {
        id: Date.now(),
        last4: cardData.number.replace(/\s+/g, "").slice(-4),
        expiry: cardData.expiry,
        type: getCardBrand(cardData.number),
        name: cardData.name,
      };

      const updatedCards = [...(values.cards || []), newCard];
      onChange("cards", updatedCards);

      // Reset form
      setCardData({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        country: "England",
      });

      onNext();
    } catch (error) {
      setErrors({ general: "Failed to add card. Please try again." });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCard = (cardId) => {
    const updatedCards = values.cards.filter((card) => card.id !== cardId);
    onChange("cards", updatedCards);
  };

  const CardIcon = ({ type }) => {
    switch (type) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-[10px] flex items-center justify-center font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded text-white text-[10px] flex items-center justify-center font-bold">
            MC
          </div>
        );
      case "american-express":
        return (
          <div className="w-8 h-5 bg-green-600 rounded text-white text-[8px] flex items-center justify-center font-bold">
            AMEX
          </div>
        );
      case "discover":
        return (
          <div className="w-8 h-5 bg-orange-500 rounded text-white text-[8px] flex items-center justify-center font-bold">
            DISC
          </div>
        );
      default:
        return (
          <div className="w-8 h-5 bg-gray-400 rounded text-white text-xs flex items-center justify-center">
            💳
          </div>
        );
    }
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Payment Setup
        </h2>
        <p className="text-sm text-gray-600">
          Secure your earnings. Add your payment details to receive payouts for
          every accepted answer.
        </p>
      </div>

      {/* Add new payment method button - only show if there are existing cards */}
      {values.cards && (
        <button
          type="button"
          className="w-full p-3 text-left transition-colors mb-4"
          onClick={() => {}}
        >
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_502_5186)">
                <path
                  d="M11 20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V13H20C20.2652 13 20.5196 12.8946 20.7071 12.7071C20.8946 12.5196 21 12.2652 21 12C21 11.7348 20.8946 11.4804 20.7071 11.2929C20.5196 11.1054 20.2652 11 20 11H13V4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289C11.1054 3.48043 11 3.73478 11 4V11H4C3.73478 11 3.48043 11.1054 3.29289 11.2929C3.10536 11.4804 3 11.7348 3 12C3 12.2652 3.10536 12.5196 3.29289 12.7071C3.48043 12.8946 3.73478 13 4 13H11V20Z"
                  fill="#09244B"
                />
              </g>
              <defs>
                <clipPath id="clip0_502_5186">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="font-medium ml-2">Add a new payment method</span>
          </div>
        </button>
      )}

      {/* Existing payment methods */}
      {values.cards &&
        values.cards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardIcon type={card.type} />
                <div>
                  <div className="font-medium text-gray-900">
                    •••• {card.last4}
                  </div>
                  <div className="text-sm text-gray-500">{card.expiry}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:text-blue-700"
                  onClick={() => {}}
                >
                  Edit
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  className="text-red-600 text-sm hover:text-red-700"
                  onClick={() => handleRemoveCard(card.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* Add new payment method form - always visible */}
      <div className="space-y-4">
        {/* Card Information Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Card Information
          </label>
          <div className="space-y-3">
            {/* Card Number */}
            <div className="relative">
              <input
                type="text"
                className={`w-full border rounded-md px-3 py-3 text-sm ${
                  errors.number ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="1234 1234 1234 1234"
                value={cardData.number}
                onChange={(e) =>
                  handleCardInputChange("number", e.target.value)
                }
                maxLength={19}
              />
              {cardData.number && (
                <div className="absolute right-3 top-3">
                  <CardIcon type={getCardBrand(cardData.number)} />
                </div>
              )}
            </div>
            {errors.number && (
              <p className="text-red-600 text-xs">{errors.number}</p>
            )}

            {/* Expiry and CVC */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  className={`w-full border rounded-md px-3 py-3 text-sm ${
                    errors.expiry ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="MM / YY"
                  value={cardData.expiry}
                  onChange={(e) =>
                    handleCardInputChange("expiry", e.target.value)
                  }
                  maxLength={7}
                />
                {errors.expiry && (
                  <p className="text-red-600 text-xs mt-1">{errors.expiry}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className={`w-full border rounded-md px-3 py-3 text-sm ${
                    errors.cvc ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder={
                    getCardBrand(cardData.number) === "american-express"
                      ? "CVVV (4 digits)"
                      : "CVC/CVV"
                  }
                  value={cardData.cvc}
                  onChange={(e) => handleCardInputChange("cvc", e.target.value)}
                  maxLength={
                    getCardBrand(cardData.number) === "american-express" ? 4 : 3
                  }
                />
                {errors.cvc && (
                  <p className="text-red-600 text-xs mt-1">{errors.cvc}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            className={`w-full border rounded-md px-3 py-3 text-sm ${
              errors.name ? "border-red-300" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Full Name on Card"
            value={cardData.name}
            onChange={(e) => handleCardInputChange("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Country or region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country or region
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            value={cardData.country}
            onChange={(e) => handleCardInputChange("country", e.target.value)}
          >
            <option value="England">England</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
      </div>

      {/* Error message */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-6 pt-4">
        <p className="text-xs text-gray-500 mb-6">
          The information that you provided here will be added to your payment
          profile. It will be stored securely and treated in accordance with the{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            AskMeDirect Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="text-blue-600 font-medium hover:text-blue-700"
          onClick={handleSkip}
        >
          Skip
        </button>

        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-8 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSaveCard}
          disabled={isValidating || !stripe}
        >
          {isValidating ? "Validating..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PaymentSetupForm;
