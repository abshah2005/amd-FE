export function getStatusLabel(status) {
  const map = {
    submitted: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    quoted: "Quoted",
    awaiting_payment: "Awaiting Payment",
    paid: "Paid",
    awaiting_response: "Awaiting Response",
    answered: "Answered",
    in_thread: "Ongoing",
    closed: "Completed",
    cancelled: "Cancelled",
  };
  return map[status] || status;
}