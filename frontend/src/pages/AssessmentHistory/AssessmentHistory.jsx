import React, { useEffect, useState } from "react";
import { getHistory } from "../../services/historyService";
import HistoryCard from "../../components/AssessmentHistory/HistoryCard";
import EmptyHistory from "../../components/AssessmentHistory/EmptyHistory";
import { HiOutlineArrowPath } from "react-icons/hi2";

export default function AssessmentHistory() {
  // =========================================================
  // PLACEHOLDER STATE
  // These variables will be replaced by actual backend state 
  // and data fetching logic in the future.
  // =========================================================
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const loadHistory = async () => {
    try {
      const data = await getHistory();

      console.log("Assessment History:", data);

      setHistory(data);
    } catch (error) {
      console.error("History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadHistory();
}, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:py-10 lg:py-12 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Assessment History
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl">
            Review all your previous  assessments.
          </p>
        </div>

        {/* Content Area */}
        <div className="w-full ">
          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20 px-4 space-y-4 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-100 shadow-xl shadow-slate-200/40 text-center transition-all duration-300">
              <HiOutlineArrowPath 
                className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 animate-spin" 
                aria-hidden="true" 
              />
              <p className="text-sm sm:text-base font-semibold text-slate-600 animate-pulse">
                Loading assessment history...
              </p>
            </div>
          ) : history.length === 0 ? (
            /* Empty State */
            <EmptyHistory />
          ) : (
            /* Populated History Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {history.map((assessment) => (
                <HistoryCard 
                  key={assessment.id} 
                  assessment={assessment} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}