import React from "react";

const CookiePage = () => {
  return (
    <div className=" min-h-screen py-10 px-10">
      <div className="max-full mx-auto bg-white  p-8">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last Updated: 20th Sep, 2025</p>
        <p className="text-gray-700 mb-6">
          This Cookie Policy explains how AskMeDirect (“we,” “our,” “us”) uses cookies and similar technologies on our website and platform. By using AskMeDirect, you agree to the use of cookies as described in this policy.
        </p>

        <hr className="mt-5 mb-10" />

        <h2 className="text-xl font-semibold mb-4">1. What Are Cookies?</h2>
        <p className="text-gray-700 mb-6">
          Cookies are small text files stored on your device when you visit a website. They help us improve your experience, remember preferences, and provide important features for the platform.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            <strong>Essential Cookies:</strong> Required for the platform to function properly (e.g., login, navigation).
          </li>
          <li>
            <strong>Performance & Analytics Cookies:</strong> Help us understand how users interact with the site so we can improve functionality and design.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Remember your preferences (e.g., language, session settings).
          </li>
          <li>
            <strong>Advertising & Marketing Cookies:</strong> Deliver relevant content and measure the effectiveness of campaigns.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">3. Third-Party Cookies</h2>
        <p className="text-gray-700 mb-6">
          Some cookies may come from trusted third-party services, such as:
        </p>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>Analytics tools (e.g., Google Analytics) to measure usage and performance.</li>
          <li>Payment providers (e.g., Stripe) for secure transactions.</li>
        </ul>
        <p className="text-gray-700 mb-6">
          We do not control these third-party cookies. Please review their policies for more details.
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Managing Cookies</h2>
        <p className="text-gray-700 mb-6">
          You can control or disable cookies in your browser settings. Please note that disabling certain cookies may affect the functionality of AskMeDirect.
        </p>
        <p className="text-gray-700 mb-6">
          To learn how to manage cookies, visit:
        </p>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Chrome Help
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Mozilla Firefox Help
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Safari Help
            </a>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">5. Updates to This Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.
        </p>

        <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
        <p className="text-gray-700 mb-6">
          If you have questions about this Cookie Policy, please contact us at : {" "}
          <b>benjamin@askmedirect.com</b>  
        </p>
        <p className="text-gray-700">
          {/* <br /> */}
          AskMeDirect is an online platform owned and operated by FlexiUp Kft.
          <p className="text-wrap">A company registered in Hungary company registration no. 01-09-430447,
          registered seat at 1138 Budapest, Gyöngyösi utca 4. Fsz. 4. ajtó</p>
        </p>
      </div>
    </div>
  );
};

export default CookiePage;