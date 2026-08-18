from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from Database.database import get_db
from Schemas.google_auth_schema import GoogleLoginRequest
from Services.google_auth_service import google_login_user
from Schemas.google_auth_schema import GoogleLinkRequest
from Services.google_auth_service import link_google_account

from Authentication.jwt_verify import verify_token
from Services.auth_service import (
    register_user,
    login_user,
     logout_user
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

#GOOGLE ENDPOINTS
@router.post(
    "/google",
    response_model=TokenResponse
)
def google_login(
    request: GoogleLoginRequest,
    db: Session = Depends(get_db)
):
    return google_login_user(
        id_token=request.id_token,
        username=request.username,
        db=db
    )


@router.post(
    "/google/link",
    response_model=TokenResponse
)
def google_link(
    request: GoogleLinkRequest,
    db: Session = Depends(get_db)
):
    return link_google_account(
        id_token=request.id_token,
        password=request.password,
        db=db
    )


#LOGOUT Endpoint
@router.post("/logout")
def logout(
    current_user=Depends(verify_token)
):

    return logout_user(current_user)



















