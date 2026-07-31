import joblib
import pandas as pd

from Schemas.assessment_schema import AssessmentRequest


# Load feature columns once when the server starts
feature_columns = joblib.load("Models/feature_columns.pkl")


# Sleep Duration Mapping (same as training)
sleep_mapping = {
    "Less than 4 hours": 0,
    "4-6 hours": 1,
    "6-8 hours": 2,
    "More than 8 hours": 3,
}


def preprocess(request: AssessmentRequest) -> pd.DataFrame:
    """
    Converts AssessmentRequest into the exact dataframe
    expected by the trained CatBoost model.
    """

    # -------------------------------------------------
    # Convert request to DataFrame
    # -------------------------------------------------

    request_dict = request.model_dump()

    processed_data = pd.DataFrame([request_dict])

    # -------------------------------------------------
    # Match training column names
    # -------------------------------------------------

    processed_data.rename(
        columns={
            "age": "Age",
            "academic_pressure": "Academic Pressure",
            "cgpa": "CGPA",
            "study_satisfaction": "Study Satisfaction",
            "sleep_duration": "Sleep Duration",
            "financial_stress": "Financial Stress",
            "family_history": "Family History Mental Illness",
            "dietary_habits": "Dietary Habits",
            "degree": "Degree",
        },
        inplace=True,
    )

    # -------------------------------------------------
    # Sleep Duration Encoding
    # -------------------------------------------------

    processed_data["Sleep Duration"] = processed_data["Sleep Duration"].map(
        sleep_mapping
    )

    # -------------------------------------------------
    # Dietary Habits One-Hot Encoding
    # Healthy is the reference category
    # -------------------------------------------------

    processed_data["Dietary Habits_Moderate"] = (
        processed_data["Dietary Habits"] == "Moderate"
    ).astype(int)

    processed_data["Dietary Habits_Others"] = (
        processed_data["Dietary Habits"] == "Others"
    ).astype(int)

    processed_data["Dietary Habits_Unhealthy"] = (
        processed_data["Dietary Habits"] == "Unhealthy"
    ).astype(int)

    processed_data.drop(columns=["Dietary Habits"], inplace=True)

    # -------------------------------------------------
    # Degree Dynamic One-Hot Encoding
    # -------------------------------------------------

    selected_degree = f"Degree_{processed_data.loc[0, 'Degree']}"

    for column in feature_columns:

        if column.startswith("Degree_"):

            processed_data[column] = (
                1 if column == selected_degree else 0
            )

    processed_data.drop(columns=["Degree"], inplace=True)

    # -------------------------------------------------
    # Create Missing Columns
    # -------------------------------------------------

    for column in feature_columns:

        if column not in processed_data.columns:
            processed_data[column] = 0

    # -------------------------------------------------
    # Arrange columns in training order
    # -------------------------------------------------
    return processed_data
    


