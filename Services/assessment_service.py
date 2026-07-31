from Schemas.assessment_schema import AssessmentRequest

from Services.preprocessing_service import preprocess
from Services.prediction_service import predict
from Services.risk_service import classify_risk
from sqlalchemy.orm import Session
from Database.models import Assessment


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
    return assessment_result