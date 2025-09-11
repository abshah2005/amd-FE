import React from "react";

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M6 7.99984L7.33333 9.33317L10 6.6665"
      stroke="#36B37E"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3334 8.66664C13.3334 12 11.0001 13.6666 8.22675 14.6333C8.08152 14.6825 7.92377 14.6802 7.78008 14.6266C5.00008 13.6666 2.66675 12 2.66675 8.66664V3.99997C2.66675 3.82316 2.73699 3.65359 2.86201 3.52857C2.98703 3.40355 3.1566 3.33331 3.33341 3.33331C4.66675 3.33331 6.33341 2.53331 7.49341 1.51997C7.63465 1.39931 7.81432 1.33301 8.00008 1.33301C8.18585 1.33301 8.36551 1.39931 8.50675 1.51997C9.67342 2.53997 11.3334 3.33331 12.6667 3.33331C12.8436 3.33331 13.0131 3.40355 13.1382 3.52857C13.2632 3.65359 13.3334 3.82316 13.3334 3.99997V8.66664Z"
      stroke="#36B37E"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserGuidelinesModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-full max-w-sm p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">User Guidelines For Askers</h2>
        <ul className="list-none pl-0 text-sm text-gray-700 space-y-3">
          <li className="flex items-center gap-2">
            ✔️ Submit clear, respectful, and well-defined questions. 
          </li>
          <li className="flex items-center gap-2">
            ✔️
            Stay within the character and image limits (you can use up to 2,500
            characters and 5 images per question).
          </li>
          <li className="flex items-center gap-2">
            ✔️
            Pay promptly to receive your answers.
          </li>
          <li className="flex items-center gap-2">
           ✔️
            Abuse of the platform may result in account suspension.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserGuidelinesModal;