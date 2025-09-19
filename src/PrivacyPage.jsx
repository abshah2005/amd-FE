import React from "react";

const PrivacyPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: 20th Sep, 2025</p>
        <p className="text-gray-700 mb-6">
          AskMeDirect ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, platform, and services (collectively, the "Services"). By using AskMeDirect, you agree to the terms described in this Privacy Policy.
        </p>

        <hr className="mt-5 mb-10"/>

        <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">a. Information you provide directly</h3>
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>Account details (name, email address, password, profile information).</li>
            <li>Payment and payout details (handled securely by third-party providers like Stripe).</li>
            <li>Questions, answers, and other content shared on the platform.</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">b. Information collected automatically</h3>
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>Device and browser information.</li>
            <li>Cookies and similar technologies (for site functionality and analytics).</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">c. Information from third parties</h3>
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>If you sign up using LinkedIn or other integrations, we may receive profile information you choose to share.</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
        <div className="mb-6">
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>Provide, maintain, and improve our Services.</li>
            <li>Facilitate payments between askers and professionals.</li>
            <li>Authenticate accounts and personalize your experience.</li>
            <li>Communicate with you about updates, support, and promotions.</li>
            <li>Ensure trust and safety (fraud detection, dispute resolution, and compliance).</li>
            <li>Analyze trends and usage to improve our platform.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;