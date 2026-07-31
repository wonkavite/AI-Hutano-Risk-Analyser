LOW_THRESHOLD = 0.40
HIGH_THRESHOLD = 0.70


def classify_risk(probability: float):
    """
    Converts the prediction probability into
    a human-readable risk level.
    """

    if probability <= LOW_THRESHOLD:

        risk_level = "Low Risk"

    elif probability < HIGH_THRESHOLD:

        risk_level = "Moderate Risk"

    else:

        risk_level = "High Risk"

    return {
        "risk_level": risk_level,
        "confidence": round(probability * 100, 2)
    }