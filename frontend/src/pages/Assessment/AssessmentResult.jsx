import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiCheckCircle,
  HiExclamationTriangle,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

import { useAssessment } from "../../context/AssessmentContext";

export default function AssessmentResult() {
  const navigate = useNavigate();

  const { latestAssessment } = useAssessment();

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!latestAssessment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <HiExclamationTriangle className="h-8 w-8 text-slate-500" />
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
            No Assessment Result
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
            We couldn't find a recent assessment result. Please complete an
            assessment first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] sm:text-base"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // RESULT DATA
  // =========================================================

  const {
    risk_level,
    confidence,
    recommendations = [],
  } = latestAssessment;

  // =========================================================
  // RISK LEVEL STYLING
  // =========================================================

  const normalizedRisk = String(risk_level || "").toLowerCase();

  const isLowRisk =
    normalizedRisk.includes("low") ||
    normalizedRisk.includes("minimal");

  const isHighRisk =
    normalizedRisk.includes("high") ||
    normalizedRisk.includes("severe");

  const riskStyles = isLowRisk
    ? {
        container:
          "border-emerald-200 bg-emerald-50",
        icon:
          "bg-emerald-100 text-emerald-600",
        text:
          "text-emerald-700",
        label:
          "text-emerald-600",
      }
    : isHighRisk
    ? {
        container:
          "border-rose-200 bg-rose-50",
        icon:
          "bg-rose-100 text-rose-600",
        text:
          "text-rose-700",
        label:
          "text-rose-600",
      }
    : {
        container:
          "border-amber-200 bg-amber-50",
        icon:
          "bg-amber-100 text-amber-600",
        text:
          "text-amber-700",
        label:
          "text-amber-600",
      };

  // =========================================================
  // CONFIDENCE FORMATTING
  // =========================================================

  const numericConfidence = Number(confidence);

  const confidencePercentage =
    numericConfidence <= 1
      ? Math.round(numericConfidence * 100)
      : Math.round(numericConfidence);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 sm:h-20 sm:w-20">
            <HiCheckCircle className="h-9 w-9 text-blue-600 sm:h-11 sm:w-11" />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-wide text-blue-600">
            Assessment Complete
          </p>

          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Your Mental Wellness Results
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Thank you for completing the assessment. Here's a summary of your
            result.
          </p>
        </header>

        {/* =====================================================
            RISK RESULT CARD
        ===================================================== */}

        <section
          className={`mt-7 rounded-3xl border-2 p-6 text-center shadow-xl shadow-slate-200/40 sm:mt-9 sm:p-8 ${riskStyles.container}`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-widest sm:text-sm ${riskStyles.label}`}
          >
            Current Risk Level
          </p>

          <div className="mt-4 flex justify-center">
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28 ${riskStyles.icon}`}
            >
              <HiCheckCircle className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>
          </div>

          <h2
            className={`mt-5 text-3xl font-black sm:text-4xl ${riskStyles.text}`}
          >
            {risk_level || "Unknown"}
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            This result is based on the information you provided in your
            assessment.
          </p>
        </section>

        {/* =====================================================
            CONFIDENCE CARD
        ===================================================== */}

        <section className="mt-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 sm:mt-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Assessment Confidence
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Confidence of the prediction.
              </p>
            </div>

            <span className="shrink-0 text-2xl font-black text-blue-600 sm:text-3xl">
              {confidencePercentage}%
            </span>
          </div>

          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-700"
              style={{
                width: `${Math.min(
                  Math.max(confidencePercentage, 0),
                  100
                )}%`,
              }}
            />
          </div>
        </section>

        {/* =====================================================
            RECOMMENDATIONS
        ===================================================== */}

        <section className="mt-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 sm:mt-6 sm:p-7">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Personalized Recommendations
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
              Here are some suggestions based on your assessment result.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="mt-6 space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={`${recommendation}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                  <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
              No recommendations were provided for this assessment.
            </p>
          )}
        </section>

        {/* =====================================================
            BACK TO DASHBOARD
        ===================================================== */}

        <div className="mt-7 pb-4 sm:mt-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.99]"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}