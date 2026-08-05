import React from 'react';
import { Link } from 'react-router-dom';
import { HiClock, HiLockClosed, HiSparkles, HiArrowRight } from 'react-icons/hi2';

export default function CTA() {

  const trustIndicators = [
    {
      icon: HiClock,
      text: 'Less than 3 minutes',
    },
    {
      icon: HiLockClosed,
      text: 'Secure & Private',
    },
    {
      icon: HiSparkles,
      text: 'AI Powered',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Subtle Decorative Gradient Circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-400/30 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-blue-300/10 blur-3xl pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Ready to Understand Your Mental Wellbeing?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 font-normal leading-relaxed mb-8 sm:mb-10">
              Take a confidential AI-powered assessment designed specifically for university students. Receive your risk prediction, personalized recommendations, and monitor your wellbeing over time.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 text-blue-100 text-xs sm:text-sm font-medium">
              {trustIndicators.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-inner"
                  >
                    <IconComponent className="w-4 h-4 text-blue-200" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Primary CTA Button */}
            <div className="flex justify-center">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-blue-600 font-bold text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-white/40 cursor-pointer"
              >
                <span>Start Free Assessment</span>
                <HiArrowRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}