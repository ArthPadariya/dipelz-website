"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {

  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "What is Dipelz?",
      answer:
        "Dipelz offers authentic Indian ready-to-cook meals and spices made with traditional recipes."
    },
    {
      question: "Are Dipelz products preservative-free?",
      answer:
        "Yes. Our products are crafted using high-quality ingredients with no artificial preservatives."
    },
    {
      question: "How long do Dipelz products last?",
      answer:
        "Our products usually have a long shelf life when stored properly in a cool and dry place."
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes, we deliver across India using reliable delivery partners."
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped you will receive tracking details through email or SMS."
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be cancelled only between Order Placement and before Packaging begins. Once the order has been packaged or shipped, cancellation will not be possible."
    }
  ];

  const toggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 py-16 px-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow"
            >

              {/* QUESTION */}

              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-6 flex justify-between items-center"
              >

                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <span className="text-2xl">
                  {active === index ? "-" : "+"}
                </span>

              </button>

              {/* ANSWER */}

              <AnimatePresence>

                {active === index && (

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >

                    <div className="px-6 pb-6 text-gray-600">

                      {faq.answer}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}