import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(
    Array.from({ length: 7 }, (_, i) => i) // All FAQs are open initially
  );

  const faqs = [
    {
      question: "How do I find the right expert?",
      answer:
        "You can browse categories, apply filters, or search by keywords.",
    },
    {
      question: "When do I have to pay for a question?",
      answer: "You only pay once the professional accepts your question.",
    },
    {
      question: "What types of questions can I ask?",
      answer:
        "You can ask text-based questions, upload images, and set your preferred delivery time for an answer.",
    },
    {
      question: "What if the professional cannot answer my question on time?",
      answer:
        "The professional may suggest an alternative delivery time before accepting. You only proceed with payment once you agree.",
    },
    {
      question: "Can I ask follow-up questions?",
      answer:
        "Yes. Once you receive your answer, you can rate the response and optionally continue the conversation for more clarity.",
    },
    {
      question: "How do professionals get paid?",
      answer:
        "Experts set up a simple payout method with Stripe and receive their earnings directly after completing answers.",
    },
    {
      question: "Is AskMeDirect available globally?",
      answer:
        "Yes. You can connect with verified professionals from different countries and categories—wherever you are.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Remove index to close
          : [...prev, index] // Add index to open
    );
  };

  return (
    <div className=" py-12 px-4 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-300 py-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 "
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: activeIndex.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-blue-600 bg-[#086BFF] rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1097_6473)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.52864 5.52876C7.65366 5.40378 7.8232 5.33357 7.99997 5.33357C8.17675 5.33357 8.34629 5.40378 8.47131 5.52876L12.2426 9.3001C12.3063 9.36159 12.3571 9.43516 12.392 9.51649C12.427 9.59783 12.4454 9.68531 12.4461 9.77383C12.4469 9.86235 12.43 9.95014 12.3965 10.0321C12.363 10.114 12.3135 10.1884 12.2509 10.251C12.1883 10.3136 12.1139 10.3631 12.0319 10.3966C11.95 10.4302 11.8622 10.447 11.7737 10.4463C11.6852 10.4455 11.5977 10.4271 11.5164 10.3922C11.435 10.3572 11.3615 10.3064 11.3 10.2428L7.99997 6.94276L4.69997 10.2428C4.57424 10.3642 4.40584 10.4314 4.23104 10.4299C4.05624 10.4284 3.88903 10.3582 3.76543 10.2346C3.64182 10.111 3.57171 9.94383 3.57019 9.76903C3.56867 9.59423 3.63587 9.42583 3.75731 9.3001L7.52864 5.52876Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1097_6473">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="matrix(-1 0 0 -1 16 16)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </motion.span>
            </button>
            <motion.div
              initial={{ height: activeIndex.includes(index) ? "auto" : 0 }}
              animate={{ height: activeIndex.includes(index) ? "auto" : 0 }}
              exit={{ height: 0 }} // Closing animation
              transition={{ duration: 0.3 }}
              className={`overflow-hidden text-gray-600 mt-2 ${
                activeIndex.includes(index) ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
