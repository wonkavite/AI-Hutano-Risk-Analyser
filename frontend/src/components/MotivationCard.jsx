import React from "react";
import {
  HiSparkles,
  HiLightBulb,
  HiHeart,
  HiSun,
} from "react-icons/hi2";

export default function MotivationCard() {
  // =========================================================
  // BACKEND / AI INTEGRATION PLACEHOLDER
  // In future versions, these static strings can be dynamically 
  // replaced by values fetched from your FastAPI endpoint 
  // (e.g., AI-generated personalized motivational quotes & tips).
  // =========================================================
  const motivationData = {
    badge: "Daily Motivation",
    quote: "Your mental health deserves the same attention as your academic success.",
    supportingText: "Small consistent progress creates lasting change. Take one step today—you don't need to solve everything at once.",
    tipTitle: "Today's Wellness Tip",
    tipBody: "Take a 10-minute walk away from your study area. Short breaks improve focus and reduce mental fatigue.",
    reminder: "Progress is measured one day at a time.",
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between">
      
      {/* Decorative Subtle Background Blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Section: Badge, Main Quote & Supporting Paragraph */}
      <div className="space-y-6">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs">
          <HiSparkles className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span>{motivationData.badge}</span>
        </div>

        {/* Main Quote & Paragraph */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            "{motivationData.quote}"
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl">
            {motivationData.supportingText}
          </p>
        </div>

        {/* Second Section: Today's Wellness Tip Container */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100/70 backdrop-blur-xs flex flex-col sm:flex-row items-start gap-3.5 transition-colors duration-200 hover:bg-blue-50/80">
          <div className="w-9 h-9 rounded-xl bg-white border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
            <HiLightBulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              {motivationData.tipTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {motivationData.tipBody}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Section: Calming Reminder */}
      <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 italic">
          <HiHeart className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
          <span>Remember: {motivationData.reminder}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
          <HiSun className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>Hutano Risky Analyser</span>
        </div>
      </div>

    </div>
  );
}