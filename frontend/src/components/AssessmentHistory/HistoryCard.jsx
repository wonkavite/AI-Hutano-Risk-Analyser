
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiShieldCheck,
  HiArrowRight,
  HiCalendarDays,
  HiChartBar,
} from "react-icons/hi2";

export default function HistoryCard({ assessment }) {
  const navigate = useNavigate();

  const formattedDate = new Date(assessment.created_at).toLocaleDateString();
  const probabilityPercent = Math.round(assessment.prediction_probability * 100);

  const getRiskStyles = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low risk":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-100",
          icon: "text-emerald-600",
          text: "text-emerald-700",
        };
      case "moderate risk":
        return {
          bg: "bg-amber-50",
          border: "border-amber-100",
          icon: "text-amber-600",
          text: "text-amber-700",
        };
      case "high risk":
        return {
          bg: "bg-rose-50",
          border: "border-rose-100",
          icon: "text-rose-600",
          text: "text-rose-700",
        };
      default:
        return {
          bg: "bg-slate-50",
          border: "border-slate-100",
          icon: "text-slate-400",
          text: "text-slate-600",
        };
    }
  };

  const riskStyles = getRiskStyles(assessment.risk_level);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      {/* Header: ID and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Assessment {assessment.id}
        </h3>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full w-fit">
          <HiCalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Body: Risk Level & Probability */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 flex-1">
        {/* Risk Level Display */}
        <div className={`flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-colors duration-200 ${riskStyles.bg} ${riskStyles.border}`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-inherit flex items-center justify-center shrink-0 shadow-sm">
            <HiShieldCheck className={`w-5 h-5 sm:w-6 sm:h-6 ${riskStyles.icon}`} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              Risk Level
            </span>
            <span className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight ${riskStyles.text}`}>
              {assessment.risk_level}
            </span>
          </div>
        </div>

        {/* Prediction Probability Display */}
        <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl border bg-slate-50 border-slate-100 transition-colors duration-200 group-hover:bg-blue-50/30 group-hover:border-blue-100/50">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
            <HiChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              Probability
            </span>
            <span className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight">
              {probabilityPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action Button */}
      <button
        type="button"
        onClick={() => navigate(`/assessment-history/${assessment.id}`)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm sm:text-base font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        aria-label={`View full details for Assessment #${assessment.id}`}
      >
        <span>View Full Assessment Details</span>
        <HiArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
      </button>
    </div>
  );
}