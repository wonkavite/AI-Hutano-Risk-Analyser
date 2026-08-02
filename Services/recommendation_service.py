def generate_recommendations(risk_level: str) -> list[str]:
    """
    Returns personalized recommendations based on
    the predicted depression risk level.
    """

    recommendations = {

        "Low Risk": [
            "Maintain a healthy sleep schedule.",
            "Exercise regularly to support your mental wellbeing.",
            "Continue practicing healthy eating habits.",
            "Stay connected with friends and family.",
        ],

        "Moderate Risk": [
            "Improve your sleep routine and aim for consistent rest.",
            "Practice stress management techniques such as meditation or deep breathing.",
            "Take regular breaks from academic work.",
            "Talk to trusted friends, family, or mentors about how you feel.",
        ],

        "High Risk": [
            "Consider seeking professional mental health support.",
            "Talk to a trusted family member or close friend.",
            "Reduce excessive academic pressure where possible.",
            "Prioritize rest, nutrition, and regular physical activity.",
            "Remember that asking for help is a sign of strength, not weakness.",
        ],
    }

    return recommendations.get(
        risk_level,
        ["No recommendations available."]
    )