import React from "react";
import AddIcon from "../icons/AddIcon";

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

const PaymentsView = () => {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-2">Payment Setup</h3>
        <p className="text-xs text-gray-500 mb-4">
          Secure your earnings. Add your payment details to receive payouts for every accepted answer.
        </p>

        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded  mb-6"
          onClick={() => console.log("add payment")}
        >
          <span className="w-4 h-4"><AddIcon /></span>
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