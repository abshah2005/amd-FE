import React from "react";

const TermsModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Terms of use</h2>
        <div className="text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
          <p>
            <strong>AskMeDirect</strong> is a platform that facilitates connections between individuals seeking information and responders who offer their time and expertise. The answers provided on AskMeDirect are for informational and educational purposes only.
          </p>
          <ul className="list-disc ml-5 my-2">
            <li>Medical and Healthcare (including doctors, nurses, therapists, mental health professionals)</li>
            <li>Veterinary Medicine</li>
            <li>Legal Advice</li>
            <li>Financial Advice (including investment, tax, and insurance)</li>
            <li>Any other field where licensure, certification, or professional regulation applies.</li>
          </ul>
          <p className="mt-2 font-semibold">Please Read Carefully:</p>
          <ul className="list-disc ml-5 my-2">
            <li>AskMeDirect is not a provider of professional services. The platform does not offer medical, veterinary, legal, financial, or other professional advice.</li>
            <li>Responses provided by users or this platform (Responders) are not a substitute for in-person consultation, diagnosis, treatment, or legal representation.</li>
            <li>Always consult a qualified, licensed professional in your local jurisdiction before making decisions regarding your health, your animals, your finances, or your legal matters.</li>
            <li>Emergency Situations: If you have an emergency, contact the appropriate emergency services immediately.</li>
            <li>AskMeDirect does not verify the licenses, certifications, or qualifications of responders and does not guarantee the accuracy, completeness, or applicability of any responses.</li>
            <li>Payments made on the platform are for the responder’s time and effort in providing general information, not for guaranteed outcomes or specific professional services.</li>
          </ul>
          <p className="mt-2 font-semibold">By using AskMeDirect, you acknowledge and agree that you:</p>
          <ul className="list-disc ml-5 my-2">
            <li>Understand the limitations of the information provided on this platform.</li>
            <li>Will not rely solely on the responses provided when making important medical, veterinary, legal, financial, or life decisions.</li>
            <li>Fully release AskMeDirect from any liability related to your use of the platform or the information provided.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;