import React from 'react';
import { 
  HiCpuChip, 
  HiShieldCheck, 
  HiAcademicCap, 
  HiBolt, 
  HiArrowDown,
  HiExclamationTriangle
} from 'react-icons/hi2';

export default function About() {
  const stats = [
    {
      id: 1,
      title: 'Machine Learning Powered',
      description: 'Advanced  Machine   Learning Model',
      icon: HiCpuChip,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 2,
      title: 'Secure & Private',
      description: '100% confidential assessment data',
      icon: HiShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 3,
      title: 'Student Focused',
      description: 'Built for academic & lifestyle stress factors',
      icon: HiAcademicCap,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 4,
      title: 'Instant Results',
      description: 'Immediate risk score & tailored steps',
      icon: HiBolt,
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ];

  const workflowSteps = [
    'Create Account',
    'Conversational Assessment',
    'Risk Prediction',
    'Recommendations',
    'Personal Recommendation Dashboard',
  ];

  return (
    <section id="about" className="bg-slate-50/60 py-16 sm:py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-6 w-fit">
              <span>About The Platform</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Why trust Student Health Depression Risk Analyzer?
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                Academic pressure, sleep deprivation, lifestyle changes, and financial stress can take a heavy toll on a student’s mental health. We built this platform specifically to address these unique challenges with empathy and clarity.
              </p>
              <p>
                By leveraging Artificial Intelligence, our platform evaluates subtle wellbeing indicators through a natural conversation, encouraging early awareness and proactive self-care before burnout or depression deepens.
              </p>
            </div>

            {/* Medical Disclaimer Note */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3.5">
              <HiExclamationTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                <span className="font-bold">Important Notice:</span> This application is an educational and early awareness tool. It is not a medical diagnosis system or a substitute for professional clinical care.
              </p>
            </div>
          </div>

          {/* Right Column: AI Workflow Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/5">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  AI Architecture Workflow
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Workflow Vertical Steps */}
              <div className="flex flex-col items-center space-y-2">
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="w-full py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-100 text-center text-sm font-bold text-slate-800 shadow-xs hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                      {step}
                    </div>

                    {index < workflowSteps.length - 1 && (
                      <HiArrowDown className="w-4 h-4 text-blue-500 my-1 animate-bounce" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Four Statistics / Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-start"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-4 shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">
                  {stat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}