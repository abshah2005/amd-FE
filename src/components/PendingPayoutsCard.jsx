import React from "react";
import { useAuth } from "../contextProvider/AuthContextProvider";
import { useProcessBacklogPayments } from "../hooks/useProcessBacklogPayments";

export default function PendingPayoutsCard({ pendingPayouts, loading, professional }) {
  const totalPending = pendingPayouts?.reduce(
    (sum, payout) => (!payout.paid ? sum + payout.amount : sum),
    0
  );

  const processBacklog = useProcessBacklogPayments();

  const handleClearPayouts = () => {
    if (!professional?.professionalId) return;
    processBacklog.mutate(professional.professionalId);
  };

  return (
    <div className="col-span-4 bg-white border rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
        <span className="text-lg font-semibold text-gray-900">
          {loading ? "..." : `$${totalPending?.toFixed(2) || "0"}`}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-pulse bg-gray-200 h-16 w-full rounded"></div>
        </div>
      ) : !pendingPayouts?.length ? (
        <div className="bg-gray-50 rounded-md p-3 text-center text-sm text-gray-500">
          No pending payouts
        </div>
      ) : (
        <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
          {pendingPayouts.map((payout, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${payout.paid ? 
                'from-green-50 to-green-100 border-green-200' : 
                'from-blue-50 to-blue-100 border-blue-200'} 
              border rounded-md p-3 relative`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${payout.paid ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-xs text-gray-600 truncate max-w-[180px]">
                    Question #{String(payout.questionId).slice(-6)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  ${payout.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{new Date(payout.timestamp).toLocaleDateString()}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  payout.paid ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {payout.paid ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full ${payout.paid ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{width: payout.paid ? '100%' : '25%'}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pendingPayouts?.some(p => !p.paid) && (
        <div className="mt-3 text-xs text-gray-500 italic">
          Complete your Stripe onboarding to receive these payments
        </div>
      )}
      {pendingPayouts?.some(p => !p.paid) && (
        <div className="mt-3 text-xs text-red-500 italic">
          You will recieve your pending payouts 24hours after you complete your Stripe onboarding.
        </div>
      )}

      {professional?.professionalId && professional?.isAllowedPayout && pendingPayouts.length>0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleClearPayouts}
            disabled={processBacklog.isLoading}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
              processBacklog.isLoading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {processBacklog.isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Clear Payouts"
            )}
          </button>
        </div>
      )}

      {processBacklog.isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center gap-4">
              <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <div>
                <h4 className="text-lg font-semibold">Processing payouts</h4>
                <p className="text-sm text-gray-600 mt-1">
                  This may take a minute or two. Please keep this tab open — we'll notify you when it's done.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}