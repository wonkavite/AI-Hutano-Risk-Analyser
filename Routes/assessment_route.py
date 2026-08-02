from fastapi import APIRouter
from Schemas.assessment_schema import (
    AssessmentRequest,
    AssessmentResponse,
    AssessmentHistoryResponse,
    AssessmentDetailResponse,
    DashboardResponse,

)
from fastapi import Depends
from sqlalchemy.orm import Session

from Database.database import get_db
from Authentication.jwt_verify import verify_token

from Services.assessment_service import(
    assess_student,
      get_assessment_history,
        get_assessment_by_id,
        get_dashboard_statistics
          )




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


@router.get(
    "/history",
    response_model=list[AssessmentHistoryResponse]
)
def assessment_history(
    db: Session = Depends(get_db),
    current_user=Depends(verify_token)
):

    history = get_assessment_history(
        db,
        current_user
    )

    return history


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(verify_token)
):

    return get_dashboard_statistics(
        db,
        current_user
    )


@router.get(
    "/{assessment_id}",
    response_model=AssessmentDetailResponse
)
def assessment_detail(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(verify_token)
):

    assessment = get_assessment_by_id(
        assessment_id,
        db,
        current_user
    )

    return assessment



