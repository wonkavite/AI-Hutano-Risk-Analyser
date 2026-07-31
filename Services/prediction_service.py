import joblib
import pandas as pd


# Load the trained model once when the server starts
model = joblib.load("Models/Student_Depression_Model.pkl")


def predict(processed_data: pd.DataFrame) -> float:
    """
    Takes a preprocessed dataframe and returns the
    probability of depression.
    """

    probability = model.predict_proba(processed_data)[0][1]

    return float(probability)


