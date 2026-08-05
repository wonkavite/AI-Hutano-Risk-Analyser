import React from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import WelcomeCard from "../../components/WelcomeCard";
import QuickStats from "../../components/QuickStats";
import MotivationCard from "../../components/MotivationCard";
import ActionCard from "../../components/ActionCards";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeCard />
      </main>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickStats />
      </main>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MotivationCard />
      </main>


      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ActionCard />
       </main>




    </div>
  );
}