import React, { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    question: 'How does the NFC tag prevent cloning?',
    answer:
      'Our NFC tags use encrypted communication protocols, ensuring each tag is uniquely authenticated. Any duplication attempts fail the verification process instantly.',
  },
  {
    question: 'Can SenseOriginal integrate with my existing supply chain system?',
    answer:
      'Yes! SenseOriginal can easily integrate with most ERP and supply chain management systems using our REST APIs.',
  },
  {
    question: 'How does CredFlow work?',
    answer:
      'CredFlow connects to your accounting tools and provides real-time financial insights, reminders, and analytics to optimize your cash flow.',
  },
  {
    question: 'Is there a cost for consumers to verify products?',
    answer:
      'No, verification is completely free for consumers. You can scan and verify products instantly via the SenseOriginal app.',
  },
  {
    question: 'What industries can benefit most from SenseOriginal?',
    answer:
      'SenseOriginal benefits any industry where product authenticity, brand protection, and consumer trust matter — including manufacturing, pharmaceuticals, fashion, electronics, automotive, FMCG, cosmetics, luxury goods, agriculture, and many more',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Parallax scroll entry effect
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) setVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      className={`relative py-20 px-6 md:px-16 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        background: 'linear-gradient(180deg, #F9FAFB 0%, rgba(239,246,255,0.4) 50%, #F3F4F6 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900">General FAQ</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className={`transform transition-transform duration-300 text-blue-500 text-2xl font-bold pr-2 ${
                    openIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
                </span>
                <span className="text-lg md:text-xl font-medium text-gray-800 flex-1">
                  {faq.question}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 text-base md:text-lg leading-relaxed pl-2 border-l-2 border-blue-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Parallax Floating Shape */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 bg-blue-200/30 rounded-full blur-3xl top-0 left-[-50px]"
          style={{ transform: 'translateY(-10%)' }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl bottom-0 right-[-50px]"
          style={{ transform: 'translateY(10%)' }}
        ></div>
      </div>
    </section>
  );
};

export default FaqSection;
