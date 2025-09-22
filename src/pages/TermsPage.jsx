import React from "react";

const TermsPage = () => {
  return (
    <div className=" min-h-screen py-10 px-10">
      <div className="w-full mx-auto bg-white p-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-6">
          Effective Date: 20th Sep, 2025
        </p>
        <p className="text-gray-700 mb-6">
          Welcome to AskMeDirect (“we,” “our,” “us”). These Terms of Service
          (“Terms”) govern your use of our website, platform, and services
          (collectively, the “Services”). By creating an account or using our
          Services, you agree to these Terms. If you do not agree, please do not
          use AskMeDirect.
        </p>

        <hr className="mt-5 mb-10" />

        <h2 className="text-xl font-semibold mb-4">1. Who We Are</h2>
        <p className="text-gray-700 mb-6">
          AskMeDirect is an online platform that connects individuals seeking
          knowledge (“Askers”) with individuals offering knowledge
          (“Professionals”). We facilitate the exchange of questions and paid
          answers through a secure platform.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. Eligibility</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>Be at least 18 years old.</li>
          <li>Provide accurate information when creating your account.</li>
          <li>Comply with these Terms and applicable laws.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">3. Accounts</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>You are responsible for all activity under your account.</li>
          <li>You may not impersonate others or provide false information.</li>
          <li>
            We may suspend or terminate accounts that violate these Terms.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">4. Asking Questions</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            Askers may submit questions in text or image format, set budgets,
            and delivery timelines.
          </li>
          <li>
            Payment is only charged once a Professional accepts the question.
          </li>
          <li>Askers must not post illegal, offensive, or harmful content.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">5. Answering Questions</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>Professionals may accept or decline questions.</li>
          <li>
            By accepting, Professionals commit to delivering a response within
            the agreed timeline.
          </li>
          <li>
            Professionals must not provide misleading, plagiarized, or harmful
            responses.
          </li>
          <li>
            Professionals may share their profile links externally to invite
            their own audience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">6. Payments & Fees</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            Payments are processed securely through third-party providers (e.g.,
            Stripe).
          </li>
          <li>Askers pay when a Professional accepts a question.</li>
          <li>
            Professionals earn payouts after delivering answers and receiving
            acceptance.
          </li>
          <li>
            AskMeDirect charges a flat 12% platform fee on each transaction.
          </li>
          <li>We do not store payment details directly.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">7. Ratings & Reviews</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            Askers can rate and review Professionals after receiving answers.
          </li>
          <li>
            Ratings and reviews must be fair, accurate, and not defamatory.
          </li>
          <li>AskMeDirect may remove reviews that violate our policies.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">8. Prohibited Uses</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>Use AskMeDirect for illegal, harmful, or fraudulent activity.</li>
          <li>Harass, abuse, or exploit other users.</li>
          <li>Post content that infringes on intellectual property rights.</li>
          <li>Attempt to hack, disrupt, or misuse the platform.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">9. Disclaimer</h2>
        <p className="text-gray-700 mb-6">
          AskMeDirect does not guarantee the accuracy, reliability, or quality
          of answers provided. We are not responsible for decisions made based
          on information shared through the platform. Professionals are
          independent individuals, not employees or representatives of
          AskMeDirect.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          10. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-6">
          To the fullest extent permitted by law:
        </p>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            AskMeDirect is not liable for indirect, incidental, or consequential
            damages.
          </li>
          <li>
            Our total liability for any claim will not exceed the amount paid
            for the specific transaction in question.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">11. Termination</h2>
        <ul className="list-disc list-inside text-gray-700 pl-5 mb-6">
          <li>
            We may suspend or terminate your account if you violate these Terms.
          </li>
          <li>Engage in fraudulent or harmful activity.</li>
          <li>Cause harm to other users or the platform.</li>
          <li>
            You may stop using AskMeDirect at any time by closing your account.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          12. Disputes & Governing Law
        </h2>
        <p className="text-gray-700 mb-6">
          Any disputes will first be attempted to resolve informally through
          support. If unresolved, disputes will be handled under the governing
          law of [Insert Jurisdiction, e.g., State of Delaware, USA].
          Arbitration or courts in that jurisdiction will have authority over
          disputes.
        </p>

        <h2 className="text-xl font-semibold mb-4">13. Changes to Terms</h2>
        <p className="text-gray-700 mb-6">
          We may update these Terms from time to time. Updates will be posted on
          this page with a revised effective date. Continued use of the Services
          means you accept the updated Terms.
        </p>

        <h2 className="text-xl font-semibold mb-4">14. Contact Us</h2>
        <p className="text-gray-700 mb-6">
          If you have questions about these Terms, please contact us at : {" "}
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

export default TermsPage;
