from pydantic import BaseModel
from datetime import datetime
from typing import Optional
class AssessmentRequest(BaseModel):

    age: int

    academic_pressure: int

    cgpa: float

    study_satisfaction: int

    sleep_duration: str

    financial_stress: float

    family_history: int

    dietary_habits: str

    degree: str


class AssessmentResponse(BaseModel):

    risk_level: str

    confidence: float
    recommendations: list[str]
class AssessmentHistoryResponse(BaseModel):

    id: int

    risk_level: str

    prediction_probability: float

    created_at: datetime

    class Config:
        from_attributes = True


class AssessmentDetailResponse(BaseModel):

    id: int

    age: int

    academic_pressure: int

    cgpa: float

    study_satisfaction: int

    sleep_duration: str

    financial_stress: float

    family_history: int

    dietary_habits: str

    degree: str

    prediction_probability: float

    risk_level: str

    created_at: datetime

    class Config:
        from_attributes = True

class LatestAssessmentResponse(BaseModel):

    id: int

    risk_level: str

    prediction_probability: float

    created_at: datetime

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):

    total_assessments: int

    high_risk: int

    moderate_risk: int

    low_risk: int

    latest_assessment: Optional[LatestAssessmentResponse]


