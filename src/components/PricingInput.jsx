import React, { useState } from "react";
import PaymentModal from "./PaymentModal";

const PricingInput = ({
  initialMode,
  status,
  price,
  priceRange = "$25-$35",
  settledPrice,
  onQuote,
  answerBy,
  onPayNow,
  role,
  questionId,
  onPriceChange,
  quote,
  onDone,
}) => {
  const [mode, setMode] = useState(initialMode);
  const [inputPrice, setInputPrice] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(initialMode);

  // Determine UI state based on status and role
  let isEditable = false;
  let isDisabled = true;
  let buttonText = "Done";
  let showInput = false;
  let showPriceRange = false;

  if (status === "awaiting_response" || status === "submitted") {
    isEditable = false;
    isDisabled = true;
    buttonText = "Done";
    showInput = false;
    showPriceRange = true;
  } else if (status === "approved") {
    if (role === "professional") {
      isEditable = true;
      isDisabled = false;
      buttonText = "Done";
      showInput = true;
      showPriceRange = false;
    } else {
      isEditable = false;
      isDisabled = true;
      buttonText = "yet to be quoted";
      showInput = false;
      showPriceRange = true;
    }
  } else if (status === "awaiting_payment" || status === "quoted") {
    if (role === "professional") {
      isEditable = false;
      isDisabled = true;
      buttonText = "Pay Now";
      showInput = false;
      showPriceRange = false;
    } else if (role === "asker") {
      isEditable = true;
      isDisabled = false;
      buttonText = "Pay Now";
      showInput = false;
      showPriceRange = false;
    }
  } else if (status === "quoted") {
    isEditable = false;
    isDisabled = true;
    buttonText = "Done";
    showInput = false;
    showPriceRange = false;
  }

  const toggleMode = (newMode) => {
    if (isEditable) {
      setMode(newMode);
    }
  };

  const handlePriceChange = (e) => {
    setInputPrice(e.target.value);
    if (onPriceChange) onPriceChange(e.target.value);
  };

  const handleDoneClick = () => {
    setIsSubmitted(true);
    if (onDone) onDone();
    if (
      status === "approved" &&
      role === "professional" &&
      onQuote &&
      inputPrice &&
      answerBy
    ) {
      onQuote({ amount: inputPrice, answerBy });
    }
  };

  // Helper to get price from quote
  const getPriceForMode = (mode) => {
    if (!quote) return 0;
    if (mode === "normal") return quote.normal?.amount || 0;
    if (mode === "fast") return quote.fast?.amount || 0;
    return 0;
  };

  const handlePayNowClick = () => {
    setIsPaymentOpen(true);
  };

  return (
    <div className="w-48 rounded-lg shadow-md p-3 bg-gray-200">
      {/* Mode Selection */}
      <div className="w-full h-auto bg-[#4D5B70]">
        <div className="flex justify-between mb-4">
          <button
            className={`flex-1 flex flex-col items-center justify-center p-2 rounded ${
              selectedDeliveryType === "normal" ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedDeliveryType("normal")}
            disabled={!isEditable}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_830_2799)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.2235 3.00155C11.282 3.26013 11.2355 3.53138 11.0941 3.75565C10.9527 3.97993 10.728 4.13888 10.4695 4.19755C10.2732 4.24214 10.0787 4.29417 9.88646 4.35355C9.76098 4.39229 9.6291 4.40594 9.49835 4.39371C9.3676 4.38148 9.24053 4.34362 9.12441 4.28229C9.00829 4.22096 8.90539 4.13735 8.82158 4.03625C8.73777 3.93515 8.6747 3.81853 8.63596 3.69305C8.59722 3.56757 8.58357 3.43569 8.5958 3.30494C8.60803 3.17419 8.64589 3.04713 8.70722 2.93101C8.76855 2.81489 8.85216 2.71199 8.95326 2.62818C9.05436 2.54437 9.17098 2.48129 9.29646 2.44255C9.53646 2.36855 9.78046 2.30255 10.0265 2.24755C10.1546 2.21842 10.2872 2.21482 10.4167 2.23695C10.5462 2.25908 10.67 2.30651 10.7812 2.37653C10.8924 2.44655 10.9886 2.53779 11.0645 2.64504C11.1404 2.75228 11.1944 2.87343 11.2235 3.00155ZM13.2735 3.00155C13.3321 2.743 13.4911 2.51834 13.7154 2.37695C13.9396 2.23556 14.2109 2.18901 14.4695 2.24755C18.9235 3.25755 22.2495 7.23955 22.2495 11.9996C22.2495 17.5226 17.7715 21.9996 12.2495 21.9996C7.48846 21.9996 3.50646 18.6746 2.49646 14.2206C2.44462 13.9645 2.49501 13.6984 2.63686 13.479C2.77871 13.2597 3.00075 13.1046 3.25551 13.0468C3.51026 12.9891 3.77749 13.0333 4.00006 13.1701C4.22262 13.3068 4.38284 13.5252 4.44646 13.7786C4.76467 15.1723 5.45056 16.4553 6.43276 17.4941C7.41496 18.5329 8.65758 19.2895 10.0313 19.6853C11.4051 20.081 12.8598 20.1014 14.2441 19.7442C15.6284 19.3871 16.8917 18.6656 17.9026 17.6547C18.9135 16.6438 19.635 15.3805 19.9922 13.9962C20.3493 12.6119 20.3289 11.1572 19.9332 9.78343C19.5374 8.40967 18.7808 7.16705 17.742 6.18485C16.7032 5.20265 15.4202 4.51677 14.0265 4.19855C13.7679 4.13966 13.5433 3.98047 13.4021 3.75599C13.2609 3.53152 13.2146 3.26014 13.2735 3.00155ZM6.86246 4.71955C6.95189 4.81584 7.02146 4.92882 7.06721 5.05201C7.11295 5.17521 7.13396 5.30622 7.12903 5.43754C7.12411 5.56886 7.09335 5.69793 7.03852 5.81735C6.98368 5.93678 6.90585 6.04423 6.80946 6.13355C6.66146 6.26955 6.51946 6.41255 6.38246 6.55955C6.2008 6.74857 5.95218 6.8587 5.69012 6.86621C5.42807 6.87373 5.17354 6.77804 4.98135 6.59974C4.78915 6.42144 4.67466 6.1748 4.66252 5.91292C4.65039 5.65104 4.74158 5.39486 4.91646 5.19955C5.08646 5.01555 5.26446 4.83755 5.44846 4.66655C5.54475 4.57712 5.65772 4.50755 5.78092 4.4618C5.90412 4.41606 6.03512 4.39505 6.16644 4.39998C6.29777 4.4049 6.42683 4.43566 6.54626 4.49049C6.66568 4.54533 6.77313 4.62316 6.86246 4.71955ZM12.2485 5.99955C12.5137 5.99955 12.768 6.10491 12.9556 6.29245C13.1431 6.47998 13.2485 6.73434 13.2485 6.99955V11.5856L15.9555 14.2926C16.1376 14.4812 16.2384 14.7338 16.2361 14.996C16.2339 15.2582 16.1287 15.509 15.9433 15.6944C15.7579 15.8798 15.5071 15.9849 15.2449 15.9872C14.9827 15.9895 14.7301 15.8887 14.5415 15.7066L11.5415 12.7066C11.3539 12.5191 11.2485 12.2647 11.2485 11.9996V6.99955C11.2485 6.73434 11.3538 6.47998 11.5414 6.29245C11.7289 6.10491 11.9832 5.99955 12.2485 5.99955ZM3.94146 8.38755C4.19485 8.46569 4.40683 8.64127 4.53079 8.87568C4.65474 9.11009 4.68052 9.38414 4.60246 9.63755C4.54309 9.82984 4.49105 10.0243 4.44646 10.2206C4.38284 10.4739 4.22262 10.6923 4.00006 10.829C3.77749 10.9658 3.51026 11.01 3.25551 10.9523C3.00075 10.8945 2.77871 10.7394 2.63686 10.5201C2.49501 10.3007 2.44462 10.0346 2.49646 9.77855C2.55246 9.53155 2.61746 9.28855 2.69146 9.04855C2.7696 8.79516 2.94518 8.58318 3.17959 8.45922C3.414 8.33527 3.68804 8.30949 3.94146 8.38755Z"
                  fill="#09244B"
                />
              </g>
              <defs>
                <clipPath id="clip0_830_2799">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.25)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span
              className={`text-xs ${
                selectedDeliveryType === "normal"
                  ? "text-gray-700"
                  : "text-gray-400"
              }`}
            >
              Normal
            </span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center justify-center p-2 rounded ${
              selectedDeliveryType === "fast" ? "bg-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedDeliveryType("fast")}
            disabled={!isEditable}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9816 0.360792C11.6136 -0.397208 12.8446 0.120792 12.7446 1.10279L12.0386 8.00079H17.7496C17.9396 8.00086 18.1257 8.05507 18.286 8.15706C18.4463 8.25906 18.5743 8.40462 18.6549 8.5767C18.7355 8.74878 18.7653 8.94026 18.741 9.12871C18.7167 9.31716 18.6392 9.49479 18.5176 9.64079L8.51763 21.6408C7.88563 22.3988 6.65463 21.8808 6.75463 20.8988L7.46063 14.0008H1.74963C1.55961 14.0007 1.37355 13.9465 1.21323 13.8445C1.05291 13.7425 0.924967 13.597 0.844383 13.4249C0.763799 13.2528 0.73391 13.0613 0.758216 12.8729C0.782522 12.6844 0.860017 12.5068 0.981626 12.3608L10.9816 0.360792Z"
                fill="#FFD700"
              />
            </svg>
            <span
              className={`text-xs ${
                selectedDeliveryType === "fast"
                  ? "text-yellow-600"
                  : "text-gray-400"
              }`}
            >
              Fast
            </span>
          </button>
        </div>
      </div>
      {/* Price Display for Asker */}
      {(role === "asker" || role==='professional') && (status==="submitted" || status==='rejected') && (
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">
            {initialMode === "normal"
              ? "Normal Delivery Price"
              : "Fast Delivery Price"}
          </p>
          <p className="text-xl font-bold text-gray-800">{priceRange}</p>
          <p className="text-xs text-gray-600 mt-2">
            Delivery Mode:{" "}
            <span className="font-semibold">
              {initialMode?.charAt(0).toUpperCase() + initialMode?.slice(1)}
            </span>
          </p>
          <button
            className="w-full py-2 mt-3 rounded-full font-medium bg-gray-400 text-gray-600 cursor-not-allowed"
            disabled
          >
            {status==="submitted"?"yet to be quoted":"rejected"}
          </button>
        </div>
      )}
      {(role === "asker" || role==='professional') && (status==="paid" || status==="closed")&& (
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">
            {initialMode === "normal"
              ? "Normal Delivery Price"
              : "Fast Delivery Price"}
          </p>
          <p className="text-xl font-bold text-gray-800">${price}</p>
          <p className="text-xs text-gray-600 mt-2">
            Delivery Mode:{" "}
            <span className="font-semibold">
              {initialMode?.charAt(0).toUpperCase() + initialMode?.slice(1)}
            </span>
          </p>
          <button
            className="w-full py-2 mt-3 rounded-full font-medium bg-gray-400 text-gray-600 cursor-not-allowed"
            disabled
          >
            Paid
          </button>
        </div>
      )}
      {role === "asker" || role==='professional' && 
        (status === "awaiting_payment" || status === "quoted") && (
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">
              {selectedDeliveryType === "normal"
                ? "Normal Delivery Price"
                : "Fast Delivery Price"}
            </p>
            <p className="text-xl font-bold text-gray-800">
              ${getPriceForMode(selectedDeliveryType)}
            </p>
            <button
              className={`w-full py-2 mt-3 rounded-full font-medium ${
                isDisabled
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={isDisabled}
              onClick={handlePayNowClick}
            >
              {buttonText}
            </button>
          </div>
        )}
      {/* Professional Pricing Input */}
      {role === "asker" && status === "approved" && (
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">
            {status === "awaiting_response" || status === "approved"
              ? "Yet to be quoted"
              : "Question Budget"}
          </p>
          {showPriceRange ? (
            <p className="text-xl font-bold text-gray-500">{priceRange}</p>
          ) : showInput ? (
            <input
              type="number"
              value={inputPrice}
              onChange={handlePriceChange}
              className="text-xl font-bold text-gray-500 border bg-gray-200 rounded w-full text-center"
              placeholder="Enter price"
              disabled={isDisabled}
            />
          ) : (
            <p
              className={`text-xl font-bold ${
                isDisabled ? "text-gray-500" : "text-gray-800"
              }`}
            >
              ${price}
            </p>
          )}

          <button
            className={`w-full py-2 mt-3 rounded-full font-medium ${
              isDisabled || (showInput && !inputPrice)
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isDisabled || (showInput && !inputPrice)}
            onClick={() => {
              console.log("Pay Now clicked", { isDisabled, buttonText });
              if (buttonText === "Pay Now" && !isDisabled)
                setIsPaymentOpen(true);
              else handleDoneClick();
            }}
          >
            {buttonText}
          </button>
        </div>
      )}

      {role === "professional" && status === "approved" && (
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">
            {status === "awaiting_response" || status === "approved"
              ? "Quote a price"
              : "Question Budget"}
          </p>
          {showPriceRange ? (
            <p className="text-xl font-bold text-gray-500">{priceRange}</p>
          ) : showInput ? (
            <input
              type="number"
              value={inputPrice}
              onChange={handlePriceChange}
              className="text-xl font-bold text-gray-500 border bg-gray-200 rounded w-full text-center"
              placeholder="Enter price"
              disabled={isDisabled}
            />
          ) : (
            <p
              className={`text-xl font-bold ${
                isDisabled ? "text-gray-500" : "text-gray-800"
              }`}
            >
              ${price}
            </p>
          )}

          <button
            className={`w-full py-2 mt-3 rounded-full font-medium ${
              isDisabled || (showInput && !inputPrice)
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isDisabled || (showInput && !inputPrice)}
            onClick={() => {
              console.log("Pay Now clicked", { isDisabled, buttonText });
              if (buttonText === "Pay Now" && !isDisabled)
                setIsPaymentOpen(true);
              else handleDoneClick();
            }}
          >
            {buttonText}
          </button>
        </div>
      )}
      <PaymentModal
        isOpen={isPaymentOpen}
        onRequestClose={() => setIsPaymentOpen(false)}
        amount={getPriceForMode(selectedDeliveryType) * 100}
        questionId={questionId}
        deliveryType={selectedDeliveryType} // Pass deliveryType to modal
      />
    </div>
  );
};

export default PricingInput;
