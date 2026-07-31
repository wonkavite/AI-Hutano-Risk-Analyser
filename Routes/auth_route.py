from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from Database.database import get_db
from Services.auth_service import (
    register_user,
    login_user
)
from Schemas.user_schema import (
    UserRegister,
    UserResponse,
    UserLogin,
    TokenResponse
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    request: UserRegister,
    db: Session = Depends(get_db)
):
    return register_user(request, db)




#LOGIN ENDPOINT
@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(request, db)