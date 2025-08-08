import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import PersonalInfoForm from "../components/PersonalnfoForm";
import ProfessionalDetailsForm from "../components/ProfessionalDetailsForm";
import PaymentSetupForm from "../components/PaymentSetupForm";

const initialPersonal = {
  profileImage: "",
  firstName: "",
  lastName: "",
  email: "",
  description: "",
  language: "",
  location: "",
};
const initialProfessional = {
  category: "",
  subcategory: "",
  tags: "",
  priceMin: "",
  priceMax: "",
  firm: "",
  exampleQuestion: "",
};
const initialPayment = {
  cards: [],
  newCard: { number: "", expiry: "", cvc: "" },
};

const ProfessionalOnboarding = () => {
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState(initialPersonal);
  const [professional, setProfessional] = useState(initialProfessional);
  const [payment, setPayment] = useState(initialPayment);

  // For completed steps
  const completedSteps = step;

  // Handlers
  const handlePersonalChange = (field, value) =>
    setPersonal(prev => ({ ...prev, [field]: value }));
  const handleProfessionalChange = (field, value) =>
    setProfessional(prev => ({ ...prev, [field]: value }));
  const handlePaymentChange = (field, value) =>
    setPayment(prev => ({ ...prev, [field]: value }));

  // Simulate image upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPersonal(prev => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  // Simulate card add
  const handleAddCard = () => {
    setPayment(prev => ({
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

  const handleRemoveCard = idx => {
    setPayment(prev => ({
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
        onChange={handleProfessionalChange}
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
          />
        </div>
        {/* Right: Step Content */}
        <div className="flex-1 flex justify-center">{rightContent}</div>
      </div>
    </div>
  );
};

export default ProfessionalOnboarding;