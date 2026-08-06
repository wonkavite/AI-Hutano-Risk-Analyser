import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import AssessmentHistory from "./pages/AssessmentHistory/AssessmentHistory";
import AssessmentHistoryDetails from "./pages/AssessmentHistory/AssessmentHistoryDetails";



export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assessment-history" element={<AssessmentHistory />} />

          <Route
          path="/assessment-history/:id"
          element={<AssessmentHistoryDetails />}
           />


        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </div>
  );
}