import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";

import AssessmentHistory from "./pages/AssessmentHistory/AssessmentHistory.jsx";
import AssessmentHistoryDetails from "./pages/AssessmentHistory/AssessmentHistoryDetails.jsx";

import Settings from "./pages/settings/Settings.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          {/* Assessment History */}
          <Route
            path="assessment-history"
            element={<AssessmentHistory />}
          />

          {/* Assessment History Details */}
          <Route
            path="assessment-history/:id"
            element={<AssessmentHistoryDetails />}
          />
        </Route>
      </Routes>
    </div>
  );
}