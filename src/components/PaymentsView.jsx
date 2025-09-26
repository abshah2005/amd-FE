import React, { useState } from "react";
import AddIcon from "../icons/AddIcon";
import { useOnboardToStripe, useStripeOnboardingStatus } from "../hooks/userhooks";

import { STRIPE_COUNTRIES } from "../utils/Constant";

const FakeCard = ({ last4 = "3321", brand = "Mastercard" }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-6 bg-black text-white flex items-center justify-center rounded text-xs">
          {brand[0]}
        </div>
        <div>
          <div className="text-sm font-medium">•••• {last4}</div>
          <div className="text-xs text-gray-400">Expires 12/27</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">12 / 25</div>
    </div>

    <div className="mt-2 flex justify-end gap-3 text-sm">
      <button
        type="button"
        className="text-blue-600 hover:underline px-2"
        onClick={() => console.log("edit", last4)}
      >
        Edit
      </button>
      <button
        type="button"
        className="text-red-500 hover:underline px-2"
        onClick={() => console.log("remove", last4)}
      >
        Remove
      </button>
    </div>
  </div>
);

const PaymentsView = ({ user }) => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const onboardToStripe = useOnboardToStripe();
  const { data: stripeStatus, isLoading: isLoadingStatus } = useStripeOnboardingStatus(
    user?.professional?._id
  );

  const handleOnboardToStripe = () => {
    if (!user?.professional) return;
    onboardToStripe.mutate({
      professionalId: user.professional._id,
      country: selectedCountry,
    }, {
      onSuccess: (data) => {
        if (data?.accountLink) {
          window.open(data.accountLink, "_blank");
        }
      },
      onError: (err) => {
        console.error("Onboard failed", err);
      },
    });
  };

  if (user?.activeRole === "professional") {
    return (
      <div className="w-full">
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-2">Stripe Account Status</h3>
          
          {isLoadingStatus ? (
            <p className="text-sm text-gray-500">Loading status...</p>
          ) : !stripeStatus?.stripeAccountId ? (
            <>
              <p className="text-xs text-gray-500 mb-4">
                To receive payments, you need to complete the Stripe onboarding process.
              </p>
              
              <div className="flex gap-3 items-end mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {STRIPE_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
                  onClick={handleOnboardToStripe}
                  disabled={onboardToStripe.isPending}
                >
                  {onboardToStripe.isPending ? "Redirecting..." : "Onboard to Stripe"}
                </button>
              </div>
            </>
          ) : !stripeStatus?.payoutsEnabled ? (
            <>
              <p className="text-sm text-amber-600 mb-2">⚠️ Onboarding incomplete</p>
              <div className="text-xs text-gray-600 mb-4">
                <p className="mb-2">Required steps:</p>
                <ul className="list-disc pl-4">
                  {stripeStatus?.requirements?.currentlyDue?.map((req) => (
                    <li key={req}>{req.split("_").join(" ")}</li>
                  ))}
                </ul>
              </div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleOnboardToStripe()}
              >
                Complete Onboarding
              </button>
            </>
          ) : (
            <div className="text-sm text-green-600">
              ✅ Your Stripe account is fully set up and ready to receive payments
            </div>
          )}

          {onboardToStripe.isError && (
            <div className="mt-2 text-sm text-red-600">
              {onboardToStripe?.error?.message || "Failed to start onboarding"}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-2">Payment Setup</h3>
        <p className="text-xs text-gray-500 mb-4">
          Secure your earnings. Add your payment details to receive payouts for every accepted answer.
        </p>

        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded mb-6"
          onClick={() => console.log("add payment")}
        >
          <span className="w-4 h-4">
            <AddIcon />
          </span>
          <span className="text-sm">Add a new payment method</span>
        </button>

        <div className="space-y-4">
          <FakeCard last4="3321" brand="Mastercard" />
          <FakeCard last4="4242" brand="Visa" />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Note: This page is static — integrate your payment provider (Stripe/PayPal) and backend endpoints later.
      </div>
    </div>
  );
};

export default PaymentsView;