import React from "react";

export default function PendingPayoutsCard({ pendingPayouts, loading }) {
  const totalPending = pendingPayouts?.reduce(
    (sum, payout) => (!payout.paid ? sum + payout.amount : sum),
    0
  );

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
                    Question #{payout.questionId.toString().slice(-6)}
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
    </div>
  );
}