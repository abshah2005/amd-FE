import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a decision
    const cookieConsent = localStorage.getItem("cookieConsent");

    // Only show the consent chip if no decision has been made yet
    if (cookieConsent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Save acceptance to localStorage
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    // Save rejection to localStorage
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-center gap-3 max-w-sm">
      <div>
        <p className="text-sm text-gray-600">
          We use cookies to personalize content, run ads, and analyze traffic.
          Read our{" "}
          <a href="?section=cookie" className="text-blue-600 underline">
            Cookie Policy
          </a>
          .
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="text-sm px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
