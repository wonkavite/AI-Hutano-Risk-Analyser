from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from Database.database import get_db
from Authentication.jwt_verify import verify_token

from Schemas.user_schema import (UserProfileResponse,
                                  UserUpdateRequest)

from Services.auth_service import (get_current_user_profile,
                                   update_current_user)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserProfileResponse
)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(verify_token)
):

    return get_current_user_profile(
        db,
        current_user
    )

@router.put(
    "/me",
    response_model=UserProfileResponse
)
def update_my_profile(
    request: UserUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(verify_token)
):

    return update_current_user(
        request,
        db,
        current_user
    )



