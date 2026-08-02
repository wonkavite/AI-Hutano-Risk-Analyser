from Schemas.assessment_schema import AssessmentRequest
from fastapi import HTTPException
from Services.preprocessing_service import preprocess
from Services.prediction_service import predict
from Services.risk_service import classify_risk
from sqlalchemy.orm import Session
from Database.models import Assessment
from sqlalchemy import func
from Services.recommendation_service import generate_recommendations



def assess_student(request: AssessmentRequest, db: Session, current_user

):
    """
    Complete assessment pipeline.

    AssessmentRequest
            ↓
    Preprocessing
            ↓
    Prediction
            ↓
    Risk Classification
    """

    # Step 1
    processed_data = preprocess(request)

    # Step 2
    probability = predict(processed_data)

    # Step 3
    assessment_result = classify_risk(probability)

    # Step 4
    recommendations = generate_recommendations(
    assessment_result["risk_level"]
)


    assessment = Assessment(
    user_id=current_user["user_id"],    
    age=request.age,
    academic_pressure=request.academic_pressure,
    cgpa=request.cgpa,
    study_satisfaction=request.study_satisfaction,
    sleep_duration=request.sleep_duration,
    financial_stress=request.financial_stress,
    family_history=request.family_history,
    dietary_habits=request.dietary_habits,
    degree=request.degree,
    prediction_probability=probability,
    risk_level=assessment_result["risk_level"],
    # user_id will be added in the next step
)
    db.add(assessment)

    db.commit()

    db.refresh(assessment)

    # Step 5
    assessment_result["recommendations"] = recommendations

    return assessment_result

#Asessment history function

def get_assessment_history(
    db: Session,
    current_user
):
    """
    Returns all assessments belonging
    to the currently authenticated user.
    """

    history = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == current_user["user_id"]
        )
        .order_by(
            Assessment.created_at.desc()
        )
        .all()
    )

    return history

#Assessment history by ID
def get_assessment_by_id(
    assessment_id: int,
    db: Session,
    current_user
):
    """
    Returns a single assessment belonging
    to the authenticated user.
    """

    assessment = (
        db.query(Assessment)
        .filter(
            Assessment.id == assessment_id,
            Assessment.user_id == current_user["user_id"]

        )
        .first()
    )

    if assessment is None:
        raise HTTPException(
            status_code=404,
            detail="Assessment not found."
        )

    if assessment.user_id != current_user["user_id"]:
        raise HTTPException(
            status_code=403,
            detail="You are not allowed to access this assessment."
        )

    return assessment

#DASHBOARD SERVICE

def get_dashboard_statistics(
    db: Session,
    current_user
):
    """
    Returns dashboard statistics
    for the authenticated user.
    """

    user_id = current_user["user_id"]

    # Total assessments
    total = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id
        )
        .count()
    )

    # High Risk
    high = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id,
            Assessment.risk_level == "High Risk"
        )
        .count()
    )

    # Moderate Risk
    moderate = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id,
            Assessment.risk_level == "Moderate Risk"
        )
        .count()
    )

    # Low Risk
    low = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id,
            Assessment.risk_level == "Low Risk"
        )
        .count()
    )

    # Latest assessment
    latest = (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id
        )
        .order_by(
            Assessment.created_at.desc()
        )
        .first()
    )

    return {
        "total_assessments": total,
        "high_risk": high,
        "moderate_risk": moderate,
        "low_risk": low,
        "latest_assessment": latest
    }

