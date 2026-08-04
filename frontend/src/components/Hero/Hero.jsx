import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-white py-12 sm:py-16 md:py-20 lg:py-28">
      {/* Background Decorative Blur Spheres */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-10 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-emerald-400/10 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-800 text-xs sm:text-sm font-semibold shadow-xs mb-6 sm:mb-8 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>AI-Powered Student Health Depression Wellbeing</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-6">
              Understand Your Health Wellbeing with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Empathetic AI
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
             Student Health Depression Risk Analyzer uses Artificial Intelligence to evaluate behavioural and lifestyle indicators associated with student mental wellbeing.

            Receive an instant risk assessment together with personalized recommendations to help you make healthier decisions.

            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#assessment"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-2xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <span>Start Assessment</span>
                <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

          
            </div>

            {/* Trust Indicator / Privacy Note */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <span>100% Anonymous & Confidential • No Medical Diagnosis Required</span>
            </div>

          </div>

          {/* Right Column - Visual Illustration Card & Dynamic Floaters */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Main Central Card (Illustration Placeholder) */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-none bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 relative">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Conversational Assessment</span>
              </div>

              {/* Chat-style Interface Illustration */}
              <div className="space-y-4">
                
                {/* Question Bubble */}
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-xs">
                    AI
                  </div>
                  <div className="bg-blue-50/80 border border-blue-100/80 rounded-2xl rounded-tl-none p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 leading-relaxed max-w-[85%]">
                    How many hours of restful sleep have you had on average this week?
                  </div>
                </div>

                {/* User Response Bubble */}
                <div className="flex gap-3 items-start justify-end">
                  <div className="bg-slate-900 text-white rounded-2xl rounded-tr-none p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed max-w-[80%] shadow-xs">
                    Around 4 to 5 hours. Academic deadlines have been quite stressful.
                  </div>
                </div>

                {/* Processing Indicator */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pt-2 px-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Analyzing risk indicators safely...</span>
                </div>

              </div>

              {/* Subtle Floating Feature Badge 1: AI Analysis */}
              <div className="mt-6 sm:absolute sm:-top-4 sm:-left-6 sm:mt-0 bg-white border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.242c-1.809.156-3.12 1.378-3.12 3.013 0 1.341.879 2.404 2.378 2.871l.666.21a3.784 3.784 0 012.333 2.115m-4.257 3.547c1.385.344 2.872.185 4.148-.444m2.383-1.89c.895-.89 1.408-2.112 1.408-3.418 0-2.316-1.576-4.086-3.875-4.471m-2.126 12.321c1.373 0 2.585-.63 3.39-1.614" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900">AI Analysis</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500">Real-time risk assessment</p>
                </div>
              </div>

              {/* Subtle Floating Feature Badge 2: Personalized Recommendations */}
              <div className="mt-3 sm:absolute sm:-bottom-6 sm:-right-4 sm:mt-0 bg-white border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900">Personalized private Insights</h2>
                  <p className="text-[11px] sm:text-xs text-slate-500">Tailored wellbeing steps</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


