import React from "react";

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
}) {
  if (!totalQuestions || totalQuestions <= 0) {
    return null;
  }

  const current = Math.min(
    Math.max(currentQuestion + 1, 1),
    totalQuestions
  );

  const progress = Math.round((current / totalQuestions) * 100);

  const isLastQuestion = current === totalQuestions;

  return (
    <div className="w-full">
      {/* =========================================================
          PROGRESS INFORMATION
      ========================================================= */}
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-blue-600 sm:text-sm">
          {isLastQuestion ? "Almost done" : "Assessment progress"}
        </span>

        <span className="shrink-0 text-sm font-bold text-slate-700 sm:text-base">
          {current}/{totalQuestions}
        </span>
      </div>

      {/* =========================================================
          PROGRESS BAR
      ========================================================= */}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 sm:h-3"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={current}
        aria-label={`Question ${current} of ${totalQuestions}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* =========================================================
          FRIENDLY PROGRESS MESSAGE
      ========================================================= */}
      <div className="mt-2">
        <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
          {isLastQuestion
            ? "You're almost done — just finish this question and we'll analyze your results."
            : `${totalQuestions - current} ${
                totalQuestions - current === 1 ? "question" : "questions"
              } remaining.`}
        </p>
      </div>
    </div>
  );
}