export const assessmentQuestions = [
  {
    id: 1,
    field: "age",
    title: "Let's begin 👋",
    question: "How old are you?",
    type: "number",
    placeholder: "Enter your age",
    min: 15,
    max: 100,
  },

  {
    id: 2,
    field: "degree",
    title: "Education",
    question: "Which degree are you currently pursuing?",
    type: "select",
    options: [
      "B.Pharm",
      "BSc",
      "BA",
      "BCA",
      "M.Tech",
      "PhD",
      "Class 12",
      "B.Ed",
      "LLB",
      "BE",
      "M.Ed",
      "MSc",
      "BHM",
      "M.Pharm",
      "MCA",
      "MA",
      "B.Com",
      "MD",
      "MBA",
      "MBBS",
      "M.Com",
      "B.Arch",
      "LLM",
      "B.Tech",
      "BBA",
      "ME",
      "MHM",
      "Others"
    ]
  },

  {
    id: 3,
    field: "academic_pressure",
    title: "Academic Life",
    question: "How stressful has your academic life been recently?",
    type: "scale",
    min: 0,
    max: 5,
    leftLabel: "Very Relaxed",
    rightLabel: "Extremely Stressful"
  },

  {
    id: 4,
    field: "study_satisfaction",
    title: "Studies",
    question: "How satisfied are you with your studies?",
    type: "scale",
    min: 0,
    max: 5,
    leftLabel: "Not Satisfied",
    rightLabel: "Very Satisfied"
  },

  {
    id: 5,
    field: "cgpa",
    title: "Academic Performance",
    question: "What's your current CGPA?",
    type: "number",
    placeholder: "Example: 3.45",
    min: 0,
    max: 10
  },

  {
    id: 6,
    field: "sleep_duration",
    title: "Sleep",
    question: "On average, how long do you sleep each day?",
    type: "select",
    options: [
      "Less than 5 hours",
      "5-6 hours",
      "7-8 hours",
      "More than 8 hours",
      "Others"
    ]
  },

  {
    id: 7,
    field: "financial_stress",
    title: "Finances",
    question: "How would you rate your financial stress?",
    type: "scale",
    min: 1,
    max: 5,
    leftLabel: "Very Low",
    rightLabel: "Very High"
  },

  {
    id: 8,
    field: "family_history",
    title: "Family",
    question: "Has anyone in your family experienced depression or another mental illness?",
    type: "radio",
    options: [
      {
        label: "Yes",
        value: 1
      },
      {
        label: "No",
        value: 0
      }
    ]
  },

  {
    id: 9,
    field: "dietary_habits",
    title: "Lifestyle",
    question: "How would you describe your eating habits?",
    type: "select",
    options: [
      "Healthy",
      "Moderate",
      "Unhealthy",
      "Others"
    ]
  }
];