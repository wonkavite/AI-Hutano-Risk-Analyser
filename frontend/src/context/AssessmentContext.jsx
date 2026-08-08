import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  // Latest assessment result
  const [latestAssessment, setLatestAssessment] = useState(null);

  // Complete assessment history
  const [assessmentHistory, setAssessmentHistory] = useState([]);

  // Dashboard statistics
  const [dashboardStats, setDashboardStats] = useState(null);

  return (
    <AssessmentContext.Provider
      value={{
        latestAssessment,
        setLatestAssessment,

        assessmentHistory,
        setAssessmentHistory,

        dashboardStats,
        setDashboardStats,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);

  if (!context) {
    throw new Error(
      "useAssessment must be used inside an AssessmentProvider"
    );
  }

  return context;
};