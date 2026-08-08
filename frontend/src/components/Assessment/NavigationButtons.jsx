import React from "react";

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
}) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      {/* =========================================================
          PREVIOUS BUTTON
      ========================================================= */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="
          min-h-[52px]
          w-full
          rounded-2xl
          border-2
          border-slate-200
          bg-white
          px-5
          py-3
          text-sm
          font-bold
          text-slate-700
          shadow-sm
          transition-all
          duration-200
          hover:border-slate-300
          hover:bg-slate-50
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:border-slate-200
          disabled:bg-slate-100
          disabled:text-slate-400
          disabled:opacity-60
          sm:w-auto
          sm:min-w-[140px]
          sm:text-base
        "
      >
        Previous
      </button>

      {/* =========================================================
          NEXT / SUBMIT BUTTON
      ========================================================= */}
      <button
        type="button"
        onClick={onNext}
        className="
          min-h-[52px]
          w-full
          rounded-2xl
          bg-blue-600
          px-6
          py-3
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-blue-600/20
          transition-all
          duration-200
          hover:bg-blue-700
          hover:shadow-xl
          hover:shadow-blue-600/30
          active:scale-[0.99]
          sm:w-auto
          sm:min-w-[180px]
          sm:text-base
        "
      >
        {isLastQuestion
          ? "Analyze My Results"
          : "Continue"}
      </button>
    </div>
  );
}