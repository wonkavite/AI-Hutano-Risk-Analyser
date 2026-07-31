from fastapi import APIRouter
from Schemas.assessment_schema import (
    AssessmentRequest,
    AssessmentResponse,
)
from fastapi import Depends
from sqlalchemy.orm import Session

from Database.database import get_db
from Authentication.jwt_verify import verify_token

from Services.assessment_service import assess_student




router = APIRouter(
    prefix="/assessment",
    tags=["Assessment"]
)

@router.post("/", response_model=AssessmentResponse)
def create_assessment(
    request: AssessmentRequest,
    db: Session = Depends(get_db),
    current_user = Depends(verify_token)
):

    result = assess_student(request, db, current_user)

    return AssessmentResponse(**result)