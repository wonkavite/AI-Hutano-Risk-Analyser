import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineChartBar,
} from "react-icons/hi2";

export default function WelcomeCard() {
  // Placeholder user object structured for FastAPI backend integration
  const { user } = useAuth();
  const displayName = user?.username || "Student";

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 relative overflow-hidden">
      {/* Decorative Subtle Blue Gradient Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="flex flex-col space-y-6 sm:space-y-8">
        
        {/* Header Greeting & Overview */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
            Hello, {displayName} 👋
          </h1>
          {user?.email && ( <p className="text-sm text-slate-500 mt-1"> Signed in as {user.email} </p> )}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            Welcome to <strong >Hutano Risky Analyser</strong>! Track your wellbeing, complete new assessments, and
            monitor your mental health journey over time.
          </p>
          <p>Always remember: <strong><i>Hutano hwakakosha!, your health is of much concern</i></strong></p>
        </div>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
          <Link
            to="/dashboard/assessment"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Start New Assessment</span>
            <HiOutlineArrowRight className="w-5 h-5 shrink-0" />
          </Link>

         <Link
    to="/dashboard/assessment-history"
    className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-200/60 hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
>
    <HiOutlineChartBar className="w-5 h-5 text-slate-500 shrink-0" />
    <span>View Previous History</span>
</Link>
        </div>

        {/* Bottom Motivational Quote */}
        <div className="pt-4 border-t border-slate-100">
          <blockquote className="text-xs sm:text-sm italic font-medium text-slate-500 flex items-center gap-2 flex-wrap">
            <span className="text-blue-500 text-base font-serif font-bold not-italic">
              “
            </span>
            <span>Small steps every day lead to stronger minds.</span>
            <span className="text-blue-500 text-base font-serif font-bold not-italic">
              ”
            </span>
          </blockquote>
        </div>

      </div>
    </div>
  );
}