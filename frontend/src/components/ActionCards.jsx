import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineArrowRight,
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function ActionCard() {
  // =========================================================
  // BACKEND INTEGRATION PLACEHOLDER
  // Replace this object with payload data retrieved from your 
  // FastAPI dashboard endpoint (e.g., response.data.action)
  // Supported types: "first_assessment" | "assessment_completed" | "take_again" | "review_recommendations"
  // =========================================================
  const action = {
    type: "first_assessment",
  };

  // Helper to resolve card configuration depending on backend action state
  const getCardContent = (type) => {
    switch (type) {
      case "assessment_completed":
        return {
          title: "Assessment Complete",
          description:
            "You have already completed today's assessment. Take time to reflect on your progress and view your current insights.",
          buttonText: "View Latest Result",
          buttonRoute: "/dashboard/results",
          icon: HiOutlineCheckCircle,
          badgeText: "Up to Date",
          iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
        };
      case "take_again":
        return {
          title: "Ready for another check-in?",
          description:
            "It's been several days since your previous assessment. Regular check-ins help build a accurate picture of your mental health trajectory.",
          buttonText: "Start Assessment Again",
          buttonRoute: "/assessment",
          icon: HiOutlineSparkles,
          badgeText: "Follow-up Due",
          iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
        };
      case "review_recommendations":
        return {
          title: "Review Your Recommendations",
          description:
            "Your personalized recommendations are ready based on your recent check-in. Explore key habits to support your wellbeing.",
          buttonText: "View Recommendations",
          buttonRoute: "/dashboard/results",
          icon: HiOutlineLightBulb,
          badgeText: "Action Required",
          iconBg: "bg-amber-50 text-amber-600 border-amber-100",
        };
      case "first_assessment":
      default:
        return {
          title: "Start Your First Assessment",
          description:
            "You haven't completed any assessment yet. Take your first assessment to receive personalized wellbeing insights and track your depression risk over time.",
          buttonText: "Start Assessment",
          buttonRoute: "/assessment",
          icon: HiOutlineRocketLaunch,
          badgeText: "Get Started",
          iconBg: "bg-blue-50 text-blue-600 border-blue-100",
        };
    }
  };

  const card = getCardContent(action.type);
  const PrimaryIcon = card.icon;

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 relative overflow-hidden">
      {/* Decorative Subtle Blue Gradient Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Layout: Stacks on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-10">
        
        {/* Left Side: Large Visual Icon & Text Container */}
        <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 w-full md:w-auto flex-1">
          
          {/* Large Hero/Illustration Icon Container */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 hover:scale-105 ${card.iconBg}`}
            aria-hidden="true"
          >
            <PrimaryIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          {/* Text Information */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                {card.badgeText}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {card.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
              {card.description}
            </p>
          </div>
        </div>

        {/* Right Side: Primary Call To Action Button */}
        <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
          <Link
            to={card.buttonRoute}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={`${card.buttonText} - Navigate to ${card.buttonRoute}`}
          >
            <span>{card.buttonText}</span>
            <HiOutlineArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </div>
  );
}