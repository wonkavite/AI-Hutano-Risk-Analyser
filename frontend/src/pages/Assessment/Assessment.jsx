import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { assessmentQuestions } from "../../data/assessmentQuestions";

import ProgressBar from "../../components/Assessment/ProgressBar";
import QuestionHeader from "../../components/Assessment/QuestionHeader";
import QuestionCard from "../../components/Assessment/QuestionCard";
import NavigationButtons from "../../components/Assessment/NavigationButtons";
import AssessmentLoading from "../../components/Assessment/AssessmentLoading";

import {
  createAssessment,
  getAssessmentHistory,
} from "../../services/assessmentService";

import { useAssessment } from "../../context/AssessmentContext";

export default function Assessment() {
  const navigate = useNavigate();

  const {
    setLatestAssessment,
    setAssessmentHistory,
  } = useAssessment();

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({
    age: "",
    degree: "",
    academic_pressure: "",
    study_satisfaction: "",
    cgpa: "",
    sleep_duration: "",
    financial_stress: "",
    family_history: "",
    dietary_habits: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  // =========================================================
  // ASSESSMENT INFORMATION
  // =========================================================

  const totalQuestions = assessmentQuestions.length;

  const question = assessmentQuestions[currentQuestion];

  const isFirstQuestion = currentQuestion === 0;

  const isLastQuestion =
    currentQuestion === totalQuestions - 1;

  // =========================================================
  // UPDATE ANSWER
  // =========================================================

  const handleAnswerChange = (value) => {
    setValidationError("");

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.field]: value,
    }));
  };

  // =========================================================
  // VALIDATE CURRENT QUESTION
  // =========================================================

  const validateCurrentQuestion = () => {
    const currentValue = answers[question.field];

    if (
      currentValue === "" ||
      currentValue === null ||
      currentValue === undefined
    ) {
      setValidationError(
        "Please answer this question before continuing."
      );

      return false;
    }

    setValidationError("");

    return true;
  };

  // =========================================================
  // PREPARE BACKEND PAYLOAD
  // =========================================================

  const preparePayload = () => {
    return {
      age: Number(answers.age),
      academic_pressure: Number(answers.academic_pressure),
      cgpa: Number(answers.cgpa),
      study_satisfaction: Number(answers.study_satisfaction),
      sleep_duration: answers.sleep_duration,
      financial_stress: Number(answers.financial_stress),
      family_history: Number(answers.family_history),
      dietary_habits: answers.dietary_habits,
      degree: answers.degree,
    };
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
  };

  // =========================================================
  // PREVIOUS QUESTION
  // =========================================================

  const handlePrevious = () => {
    if (isFirstQuestion) {
      return;
    }

    setValidationError("");

    setCurrentQuestion((previousQuestion) => previousQuestion - 1);
  };

  // =========================================================
  // SUBMIT ASSESSMENT
  // =========================================================

  const handleSubmit = async () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    try {
      setLoading(true);
      setValidationError("");

      const payload = preparePayload();

      console.log("Assessment payload:", payload);

      // Send assessment to backend
      const result = await createAssessment(payload);

      console.log("Assessment result:", result);

      // =====================================================
      // SAVE LATEST ASSESSMENT
      // =====================================================

      setLatestAssessment(result);

      // =====================================================
      // REFRESH ASSESSMENT HISTORY
      // =====================================================

      const history = await getAssessmentHistory();

      setAssessmentHistory(history);

      // =====================================================
      // GO TO RESULTS
      // =====================================================

      navigate("/assessment-result");
    } catch (error) {
      console.error("Assessment submission error:", error);

      const errorMessage =
        error?.detail ||
        error?.message ||
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Unable to submit assessment. Please try again.";

      setValidationError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return <AssessmentLoading />;
  }

  // =========================================================
  // SAFETY CHECK
  // =========================================================

  if (!question) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-rose-50 p-6 text-center">
          <h2 className="text-lg font-bold text-rose-700">
            Assessment unavailable
          </h2>

          <p className="mt-2 text-sm text-rose-600">
            We couldn't load the assessment questions.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-5 min-h-[50px] w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // MAIN ASSESSMENT UI
  // =========================================================

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {isFirstQuestion && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Back to Dashboard
          </button>
        </div>
      )}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <QuestionHeader
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="mt-6 sm:mt-8">
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />
      </div>

      {/* =====================================================
          QUESTION
      ===================================================== */}

      <div className="mt-6 sm:mt-8">
        <QuestionCard
          question={question}
          value={answers[question.field]}
          onChange={handleAnswerChange}
        />
      </div>

      {/* =====================================================
          VALIDATION ERROR
      ===================================================== */}

      {validationError && (
        <div
          className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4"
          role="alert"
        >
          <p className="text-sm font-semibold leading-relaxed text-rose-700 sm:text-base">
            {validationError}
          </p>
        </div>
      )}

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="mt-6 sm:mt-8">
        <NavigationButtons
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      {/* =====================================================
          FRIENDLY FOOTER
      ===================================================== */}

      <div className="mt-8 text-center sm:mt-10">
        {isLastQuestion ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <h3 className="text-base font-bold text-blue-700 sm:text-lg">
              🎉 You're almost done!
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              One final step and we'll generate your personalized
              mental wellness assessment.
            </p>
          </div>
        ) : (
          <p className="text-xs font-medium text-slate-400 sm:text-sm">
            Take your time. There are no right or wrong answers.
          </p>
        )}
      </div>
    </main>
  );
}