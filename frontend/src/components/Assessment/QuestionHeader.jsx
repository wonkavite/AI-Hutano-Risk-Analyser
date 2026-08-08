import React from "react";

export default function QuestionHeader({
  currentQuestion,
  totalQuestions = 9,
}) {
  const messages = [
    "👋 Let's get started!",
    "You're doing great! Keep going.",
    "Nice! Every answer helps us understand you better.",
    "You're making good progress.",
    "🎉 You're over halfway there!",
    "Keep it up! You're doing really well.",
    "Almost finished. You've got this!",
    "Only one more after this!",
    "🎯 Final question! You're almost done.",
  ];

  const questionNumber = currentQuestion + 1;

  const safeQuestionNumber = Math.min(
    Math.max(questionNumber, 1),
    totalQuestions
  );

  const message =
    messages[safeQuestionNumber - 1] ||
    "You're doing great! Keep going.";

  const isLastQuestion = safeQuestionNumber === totalQuestions;

  return (
    <header className="w-full text-center">
      {/* =========================================================
          QUESTION COUNTER
      ========================================================= */}
      <div className="mb-3 flex justify-center">
        <span
          className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide sm:px-4 sm:text-sm ${
            isLastQuestion
              ? "bg-emerald-100 text-emerald-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isLastQuestion
            ? `Final question • ${safeQuestionNumber}/${totalQuestions}`
            : `Question ${safeQuestionNumber} of ${totalQuestions}`}
        </span>
      </div>

      {/* =========================================================
          MAIN TITLE
      ========================================================= */}
      <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        Mental Health Assessment
      </h1>

      {/* =========================================================
          MOTIVATIONAL MESSAGE
      ========================================================= */}
      <p className="mx-auto mt-2 max-w-xl px-2 text-sm font-semibold leading-relaxed text-blue-600 sm:text-base">
        {message}
      </p>
    </header>
  );
}