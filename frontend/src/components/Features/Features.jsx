import React from 'react';
import { 
  HiSparkles, 
  HiLightBulb, 
  HiShieldCheck, 
  HiChartBar, 
  HiChatBubbleLeftRight, 
  HiBolt 
} from 'react-icons/hi2';

export default function Features() {
  const features = [
    {
      id: 1,
      title: 'AI Risk Assessment',
      description: 'Uses an advanced machine learning model to estimate health depression risk from student wellbeing indicators.',
      icon: HiSparkles,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 2,
      title: 'Personalized Recommendations',
      description: 'Receive practical recommendations tailored to your predicted risk level and wellbeing needs.',
      icon: HiLightBulb,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 3,
      title: 'Private & Secure',
      description: 'Your assessment remains confidential and is only accessible through your secure account.',
      icon: HiShieldCheck,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 4,
      title: 'Personal Dashboard',
      description: 'View assessment history and monitor your wellbeing over time.',
      icon: HiChartBar,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 5,
      title: 'Conversational Assessment',
      description: 'Answer simple questions naturally through an AI conversation instead of filling long forms.',
      icon: HiChatBubbleLeftRight,
      iconBg: 'bg-sky-50 text-sky-600',
    },
    {
      id: 6,
      title: 'Instant Results',
      description: 'Receive your  risk prediction and recommendations immediately after the assessment.',
      icon: HiBolt,
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section id="features" className="bg-white py-16 sm:py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4">
            <span>Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6">
            Powerful Features Designed for Student Wellbeing
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
            Everything you need to assess, understand and improve your mental wellbeing.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Icon Container */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Banner - Inserted directly below the 6 Feature Cards Grid */}
        <div className="mt-12 sm:mt-16 bg-slate-50/80 border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            
            {/* Stat 1 */}
            <div className="pt-4 sm:pt-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600 tracking-tight">
                95%
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                Prediction Accuracy
              </span>
            </div>

            {/* Stat 2 */}
            <div className="pt-6 sm:pt-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-600 tracking-tight">
                10,000+
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                Assessments
              </span>
            </div>

            {/* Stat 3 */}
            <div className="pt-6 sm:pt-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-600 tracking-tight">
                100%
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                Private & Anonymous
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}