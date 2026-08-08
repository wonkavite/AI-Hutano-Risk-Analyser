import React from "react";

export default function AssessmentLoading() {

  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="text-6xl mb-6">
          🤖
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Analyzing your responses...
        </h2>

        <p className="text-slate-500 mt-3">
          This usually takes only a few seconds.
        </p>

        <div className="mt-8">

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

            <div className="h-full bg-blue-600 animate-pulse w-3/4"/>

          </div>

        </div>

      </div>

    </div>

  );

}