import React, { useState, useCallback } from "react";
import StepIndicator from "../components/StepIndicator";
import PersonalInfoForm from "../components/PersonalnfoForm";
import ProfessionalDetailsForm from "../components/ProfessionalDetailsForm";
import PaymentSetupForm from "../components/PaymentSetupForm";
import { useLocation, useNavigate } from "react-router-dom";

const initialPersonal = {
  profileImage: "",
  profileImageFile: null,
  firstName: "",
  lastName: "",
  email: "",
  description: "",
  language: "",
  location: "",
};
const initialProfessional = {
  selectedSpecializations: [],
  tags: [],
  priceMin: "",
  priceMax: "",
  isFirm: false,
  firm: "",
  exampleQuestions: [],
  deliveryTime: "", 
  languages: [],
};
const initialPayment = {
  cards: [],
  newCard: { number: "", expiry: "", cvc: "" },
};

const ProfessionalOnboarding = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState(initialPersonal);
  const [professional, setProfessional] = useState(initialProfessional);
  const [payment, setPayment] = useState(initialPayment);
  const [payloadData,setPayloadData]=useState({});
  initialPersonal.email=user?.email ;
  // For completed steps
  const completedSteps = step;

  // Memoized handlers
  const handlePersonalChange = useCallback(
    (field, value) => setPersonal((prev) => ({ ...prev, [field]: value })),
    []
  );
  const handleProfessionalChange = useCallback(
    (field, value) => setProfessional((prev) => ({ ...prev, [field]: value })),
    []
  );
  const handlePaymentChange = useCallback(
    (field, value) => setPayment((prev) => ({ ...prev, [field]: value })),
    []
  );

  // For image upload (simulate)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonal((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
        profileImageFile: file,
      }));
    }
  };

  // Simulate card add
  const handleAddCard = () => {
    setPayment((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          last4: prev.newCard.number.slice(-4),
          expiry: prev.newCard.expiry,
        },
      ],
      newCard: { number: "", expiry: "", cvc: "" },
    }));
  };

  const handleRemoveCard = (idx) => {
    setPayment((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== idx),
    }));
  };

  // Step content
  let rightContent;
  if (step === 0)
    rightContent = (
      <PersonalInfoForm
        values={personal}
        onChange={handlePersonalChange}
        onImageChange={handleImageChange}
        onNext={() => setStep(1)}
      />
    );
  else if (step === 1)
    rightContent = (
      <ProfessionalDetailsForm
        values={professional}
        personal={personal}
        onChange={handleProfessionalChange}
        setPayloadData={setPayloadData}
        onNext={() => setStep(2)}
      />
    );
  else
    rightContent = (
      <PaymentSetupForm
        values={payment}
        onChange={handlePaymentChange}
        onAdd={handleAddCard}
        onRemove={handleRemoveCard}
        onNext={() => alert("All steps complete! (Integrate API here)")}
      />
    );

  return (
    <div className="min-h-screen bg-[#F0F1F3] flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-8 py-10">
        {/* Left: Step Indicator */}
        <div className="w-full md:w-1/3">
          <StepIndicator
            currentStep={step}
            completedSteps={completedSteps}
            onStepClick={setStep}
            payloadData={payloadData}
          />
        </div>
        {/* Right: Step Content */}
        <div className="flex-1 flex justify-center">{rightContent}</div>
      </div>
    </div>
  );
};

export default ProfessionalOnboarding;