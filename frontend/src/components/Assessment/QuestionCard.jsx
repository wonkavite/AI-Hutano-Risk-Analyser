import React from "react";
import ScrollToTop from "../ScrollToTop.jsx";

export default function QuestionCard({
  question,
  value,
  onChange,
}) {
  if (!question) return null;

  return (
    <div className="w-full rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 md:p-8">
      <ScrollToTop watch={[question?.field]} />
      {/* =========================================================
          QUESTION HEADER
      ========================================================= */}
      <div className="mb-7 space-y-3 sm:mb-8">
        {question.title && (
          <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
            {question.title}
          </span>
        )}

        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {question.question}
        </h2>

        {question.helper && (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {question.helper}
          </p>
        )}
      </div>

      {/* =========================================================
          NUMBER INPUT
      ========================================================= */}
      {question.type === "number" && (
        <div className="w-full">
          <input
            type="number"
            value={value ?? ""}
            min={question.min}
            max={question.max}
            placeholder={question.placeholder || ""}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[56px] w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-semibold text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 sm:text-lg"
          />

          {(question.min !== undefined || question.max !== undefined) && (
            <p className="mt-2 px-1 text-xs text-slate-400 sm:text-sm">
              {question.min !== undefined && question.max !== undefined
                ? `Enter a value between ${question.min} and ${question.max}.`
                : question.min !== undefined
                ? `Minimum value: ${question.min}.`
                : `Maximum value: ${question.max}.`}
            </p>
          )}
        </div>
      )}

      {/* =========================================================
          SELECT
      ========================================================= */}
      {question.type === "select" && (
        <div className="w-full">
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[56px] w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 sm:text-lg"
          >
            <option value="">Select an option</option>

            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* =========================================================
          RADIO OPTIONS
      ========================================================= */}
      {question.type === "radio" && (
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {question.options?.map((option) => {
            const selected = value === option.value;

            return (
              <label
                key={option.value}
                className={`flex min-h-[60px] w-full cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-200 active:scale-[0.99] ${
                  selected
                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={question.field}
                  value={option.value}
                  checked={selected}
                  onChange={() => onChange(option.value)}
                  className="h-5 w-5 shrink-0 accent-blue-600"
                />

                <span
                  className={`text-sm font-semibold sm:text-base ${
                    selected ? "text-blue-800" : "text-slate-700"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {/* =========================================================
          SCALE / RATING
      ========================================================= */}
      {question.type === "scale" && (
        <div className="w-full space-y-5">
          {/* Current rating */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-black text-blue-700 shadow-sm sm:h-20 sm:w-20 sm:text-3xl">
              {value ?? question.min}
            </div>
          </div>

          {/* Slider */}
          <div className="px-1 sm:px-2">
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={value ?? question.min}
              onChange={(e) => onChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-blue-600"
            />
          </div>

          {/* Scale labels */}
          <div className="flex items-start justify-between gap-4 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="max-w-[45%] text-left">
              {question.leftLabel}
            </span>

            <span className="max-w-[45%] text-right">
              {question.rightLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}