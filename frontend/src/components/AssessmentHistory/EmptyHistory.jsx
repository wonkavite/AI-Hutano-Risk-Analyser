import React from "react";
import { useNavigate } from "react-router-dom";
import { HiClipboardDocumentList } from "react-icons/hi2";

export default function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xl">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <HiClipboardDocumentList className="w-10 h-10 text-slate-500" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        No Assessment History
      </h2>

      <p className="text-slate-500 mt-3 text-center max-w-md">
        You haven't completed any assessments yet.
        Take your first assessment to begin tracking your  records.
      </p>

      <button
        onClick={() => navigate("/assessment")}
        className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        Take Your First Assessment
      </button>
    </div>
  );
}