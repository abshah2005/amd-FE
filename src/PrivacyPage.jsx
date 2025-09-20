import React from "react";

const PrivacyPage = () => {
  return (
    <div className=" min-h-screen py-10 px-10">
      <div className="w-full mx-auto bg-white   p-8">
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

        <h2 className="text-xl font-semibold mb-4">3. How We Share Your Information</h2>
        <div className="mb-6">
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>With service providers (e.g., Stripe for payments, hosting providers, analytics tools).</li>
            <li>With other users (e.g., profile details shared publicly, your submitted questions/answers).</li>
            <li>For legal reasons (if required by law, regulation, or to protect the rights, safety, or property of AskMeDirect and our users).</li>
            <li>In case of a business transfer (such as a merger, acquisition, or sale of assets).</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-4">4. Payments and Financial Information</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            Payments are processed securely through trusted third-party providers (e.g., Stripe). AskMeDirect does not store credit card or bank account details directly.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">5. Your Rights & Choices</h2>
        <div className="mb-6">
          <ul className="list-disc list-inside text-gray-700 pl-5">
            <li>Accessing the data we hold about you.</li>
            <li>Updating or correcting your information.</li>
            <li>Requesting deletion of your account and personal data.</li>
            <li>Opting out of promotional communications.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            To exercise these rights, contact us at: [Insert Contact Email].
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            We implement reasonable technical and organizational measures to protect your data. However, no online system is 100% secure, and we cannot guarantee absolute protection.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">7. International Users</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            Our Services are accessible globally. By using AskMeDirect, you acknowledge that your data may be transferred and processed in countries outside your own, including those that may not have the same level of data protection.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            AskMeDirect is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">9. Updates to This Privacy Policy</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
        <div className="mb-6">
          <p className="text-gray-700">
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-700 mt-2">
            [Insert Contact Email] <br />
            [Insert Company Name & Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;