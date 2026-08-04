import React, { useState } from 'react';
import { HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is this a medical diagnosis?',
      answer:
        'No. This platform is an AI-powered early screening and awareness tool. It does not replace professional medical diagnosis or clinical healthcare services.',
    },
    {
      question: 'Is my data private?',
      answer:
        'Yes. Your assessment data is encrypted, securely stored, and only accessible through your authenticated student account.',
    },
    {
      question: 'How long does the assessment take?',
      answer:
        'Most students complete the single-question conversational assessment in under three minutes.',
    },
    {
      question: 'Can I take the assessment multiple times?',
      answer:
        'Yes. Every completed assessment is safely recorded in your personal dashboard so you can track changes in your wellbeing over time.',
    },
    {
      question: 'How accurate is the AI prediction?',
      answer:
        'Predictions are generated using a trained CatBoost machine learning model designed for student depression risk estimation. Results should always be interpreted responsibly as an awareness guide.',
    },
    {
      question: 'Who can use this platform?',
      answer:
        'The platform is designed specifically for university students, college students, and young adults navigating academic pressure.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4">
            <HiQuestionMarkCircle className="w-4 h-4 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
            Everything you need to know before taking your assessment.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50/30 shadow-md'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <HiChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Animated Collapsible Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6 px-5 sm:px-6' : 'grid-rows-[0fr] opacity-0 px-5 sm:px-6'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support Card - Configured with WhatsApp Integration */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
              <FaWhatsapp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Still have questions?
              </h3>
              <p className="text-sm text-slate-600 mt-0.5 font-normal">
                Chat with our support team or Developer directly on WhatsApp for instant assistance.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/263717634722?text=${encodeURIComponent(
              'Hello Wonka, I have a question regarding the platform.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-600/20 flex-shrink-0"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}