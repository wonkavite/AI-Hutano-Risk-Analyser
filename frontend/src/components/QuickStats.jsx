import React from "react";
import { getDashboardStats } from "../services/dashboardService";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineClock,
} from "react-icons/hi2";

export default function QuickStats() {
  // =========================================================
  // BACKEND INTEGRATION PLACEHOLDER
  // Replace this object with data retrieved from your FastAPI API endpoint
  // =========================================================
  const [stats, setStats] = React.useState({
  total_assessments: 0,
  high_risk: 0,
  moderate_risk: 0,
  low_risk: 0,
  latest_assessment: null,
});

React.useEffect(() => {
  const loadDashboardStats = async () => {
    try {
      const data = await getDashboardStats();

      console.log("Dashboard Stats:", data);

      setStats(data);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    }
  };

  loadDashboardStats();
}, []);
  // Dynamic styling helper for Risk Levels
  const getRiskConfig = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low risk":
      case "low":
        return {
          textColor: "text-emerald-700",
          iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
        };
      case "moderate risk":
      case "moderate":
        return {
          textColor: "text-amber-700",
          iconBg: "bg-amber-50 border-amber-100 text-amber-600",
        };
      case "high risk":
      case "high":
        return {
          textColor: "text-rose-700",
          iconBg: "bg-rose-50 border-rose-100 text-rose-600",
        };
      default:
        return {
          textColor: "text-slate-400",
          iconBg: "bg-slate-100 border-slate-200 text-slate-500",
        };
    }
  };

  const riskStyle = getRiskConfig(stats.latest_assessment?.risk_level);

  const statCards = [
  {
    id: "total-assessments",
    title: "Total Assessments",
    value: stats.total_assessments,
    description: "Assessments completed",
    icon: HiOutlineClipboardDocumentCheck,
    iconBg: "bg-blue-50 border-blue-100 text-blue-600",
    valueColor: "text-slate-900",
  },
  {
    id: "latest-risk",
    title: "Latest Risk",
    value: stats.latest_assessment?.risk_level || "—",
    description: stats.latest_assessment
  ? new Date(stats.latest_assessment.created_at).toLocaleDateString()
  : "No assessments yet",
    icon: HiOutlineShieldCheck,
    iconBg: riskStyle.iconBg,
    valueColor: riskStyle.textColor,
  },
  {
    id: "high-risk",
    title: "High Risk Cases",
    value: stats.high_risk,
    description: "High-risk assessments",
    icon: HiOutlineChartBar,
    iconBg: "bg-rose-50 border-rose-100 text-rose-600",
    valueColor: "text-rose-700",
  },
  {
    id: "moderate-risk",
    title: "Moderate Risk Cases",
    value: stats.moderate_risk,
    description: "Moderate-risk assessments",
    icon: HiOutlineClock,
    iconBg: "bg-amber-50 border-amber-100 text-amber-600",
    valueColor: "text-amber-700",
  },
];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            tabIndex={0}
            className="group p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs sm:text-sm font-semibold text-slate-500 truncate">
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.iconBg}`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight break-words ${card.valueColor}`}
              >
                {card.value}
              </div>
            </div>

            <p className="text-xs text-slate-500 font-normal mt-3 pt-3 border-t border-slate-100">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}