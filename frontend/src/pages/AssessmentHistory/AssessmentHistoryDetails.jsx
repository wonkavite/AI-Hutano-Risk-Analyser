import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHistoryDetails } from "../../services/historyService";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineShieldExclamation,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineFaceSmile,
  HiOutlineMoon,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineHeart,
  HiOutlineChartBar
} from "react-icons/hi2";

export default function AssessmentHistoryDetails() {
  // =========================================================
  // BACKEND INTEGRATION PLACEHOLDER
  // Replace this object with data passed via router state 
  // or fetched via FastAPI endpoint later.
  // =========================================================
  const { id } = useParams();

const [assessment, setAssessment] = useState(null);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadAssessment = async () => {
    try {
      const data = await getHistoryDetails(id);

      console.log("Assessment Details:", data);

      setAssessment(data);
    } catch (error) {
      console.error("Assessment Details Error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadAssessment();
}, [id]);


if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
      Loading assessment details...
    </div>
  );
}

if (!assessment) {
  return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Assessment not found.
    </div>
  );
}

  const formattedDate = new Date(assessment.created_at).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const probabilityPercent = Math.round(assessment.prediction_probability * 100);
  
  const getRecommendations = (riskLevel) => {


  switch (riskLevel?.toLowerCase()) {
    case "low risk":
      return [
        "Maintain your current healthy lifestyle.",
        "Continue getting adequate sleep.",
        "Exercise regularly and stay physically active.",
        "Take regular breaks while studying.",
        "Stay socially connected with friends and family.",
      ];

    case "moderate risk":
      return [
        "Improve your sleep routine and daily schedule.",
        "Reduce prolonged academic stress where possible.",
        "Practice relaxation techniques such as meditation or deep breathing.",
        "Talk to trusted friends or family members.",
        "Consider speaking with a school counselor if stress continues.",
      ];

    case "high risk":
      return [
        
        "Seek support from a mental health professional.",
        "Reach out to trusted family or close friends.",
        "Reduce overwhelming academic pressure where possible.",
        "Maintain healthy eating and sleeping habits.",
        "If your emotional state worsens or you feel unsafe, seek immediate professional help.",
      ];

    default:
      return [
        "No recommendations available."
      ];
  }
};

const recommendations = getRecommendations(assessment.risk_level);



  // Dynamic styles based on risk level
  const getRiskConfig = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low risk":
      case "low":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          icon: HiOutlineShieldCheck,
          badgeBg: "bg-emerald-100 text-emerald-800",
        };
      case "moderate risk":
      case "moderate":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: HiOutlineShieldExclamation,
          badgeBg: "bg-amber-100 text-amber-800",
        };
      case "high risk":
      case "high":
        return {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-700",
          icon: HiOutlineShieldExclamation,
          badgeBg: "bg-rose-100 text-rose-800",
        };
      default:
        return {
          bg: "bg-slate-50",
          border: "border-slate-200",
          text: "text-slate-700",
          icon: HiOutlineShieldExclamation,
          badgeBg: "bg-slate-100 text-slate-800",
        };
    }
  };

  const riskStyles = getRiskConfig(assessment.risk_level);
  const RiskIcon = riskStyles.icon;

  // Data structure for the grid layout
  const infoCards = [
    { label: "Age", value: `${assessment.age} Years`, icon: HiOutlineUser },
    { label: "Degree", value: assessment.degree, icon: HiOutlineAcademicCap },
    { label: "CGPA", value: assessment.cgpa, icon: HiOutlineChartBar },
    { label: "Academic Pressure", value: `${assessment.academic_pressure} / 5`, icon: HiOutlineBookOpen },
    { label: "Study Satisfaction", value: `${assessment.study_satisfaction} / 5`, icon: HiOutlineFaceSmile },
    { label: "Sleep Duration", value: assessment.sleep_duration, icon: HiOutlineMoon },
    { label: "Financial Stress", value: `${assessment.financial_stress} / 5`, icon: HiOutlineCurrencyDollar },
    { label: "Family History", value: assessment.family_history === 1 ? "Yes" : "No", icon: HiOutlineUsers },
    { label: "Dietary Habits", value: assessment.dietary_habits, icon: HiOutlineHeart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:py-10 sm:px-6 lg:py-12 lg:px-8 font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10">
        
        {/* =========================================================
            HEADER SECTION
        ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
              Assessment Details
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                ID: #{assessment.id}
              </span>
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <HiOutlineCalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2 mt-2 sm:mt-0">
            <div className={`px-4 py-2 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 ${riskStyles.badgeBg}`}>
              <RiskIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{assessment.risk_level}</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
              {probabilityPercent}%
            </span>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: PREDICTION SUMMARY 
        ========================================================= */}
        <section aria-labelledby="prediction-summary" className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300 ${riskStyles.bg} ${riskStyles.border}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10 relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 shadow-sm border ${riskStyles.border} flex items-center justify-center shrink-0`}>
              <RiskIcon className={`w-8 h-8 sm:w-10 sm:h-10 ${riskStyles.text}`} aria-hidden="true" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 id="prediction-summary" className="text-sm sm:text-base font-bold text-slate-600 uppercase tracking-wider">
                Prediction Summary
              </h2>
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${riskStyles.text}`}>
                {assessment.risk_level} <span className="opacity-60 font-light mx-2">|</span> {probabilityPercent}% Probability
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 1: ASSESSMENT INFORMATION GRID
        ========================================================= */}
        <section aria-labelledby="assessment-info">
          <h2 id="assessment-info" className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6 px-1">
            Assessment Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index}
                  className="group flex flex-col justify-center bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs sm:text-sm font-semibold text-slate-500 truncate">
                        {card.label}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-900 truncate">
                        {card.value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: AI RECOMMENDATIONS PLACEHOLDER
        ========================================================= */}
        <section aria-labelledby="ai-recommendations" className="mt-2">
          <div className="flex items-center gap-2 mb-5 sm:mb-6 px-1">
            <HiOutlineSparkles className="w-6 h-6 text-blue-600" aria-hidden="true" />
            <h2 id="ai-recommendations" className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Recommendations
            </h2>
          </div>
         <div className="w-full bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">

  <ul className="space-y-4">

    {recommendations.map((item, index) => (

      <li
        key={index}
        className="flex items-start gap-3"
      >

        <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />

        <span className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {item}
        </span>

      </li>

    ))}

  </ul>

</div>
        </section>

        {/* =========================================================
            BOTTOM: NAVIGATION
        ========================================================= */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200">
          <Link
            to="/dashboard/assessment-history"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 sm:py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base rounded-2xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <HiOutlineArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Back to History</span>
          </Link>
        </div>

      </div>
    </div>
  );
}