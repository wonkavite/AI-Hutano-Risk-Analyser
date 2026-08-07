import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Every dashboard page will render here */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}