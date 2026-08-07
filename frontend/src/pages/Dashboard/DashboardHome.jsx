import React from "react";
import WelcomeCard from "../../components/WelcomeCard";
import QuickStats from "../../components/QuickStats";
import MotivationCard from "../../components/MotivationCard";
import ActionCard from "../../components/ActionCards";

export default function DashboardHome() {
  return (
    <>
      <WelcomeCard />

      <div className="mt-8">
        <QuickStats />
      </div>

      <div className="mt-8">
        <MotivationCard />
      </div>

      <div className="mt-8">
        <ActionCard />
      </div>
    </>
  );
}