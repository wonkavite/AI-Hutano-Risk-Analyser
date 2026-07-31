from pydantic import BaseModel


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