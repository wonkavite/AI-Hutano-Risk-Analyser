from fastapi import HTTPException
from sqlalchemy.orm import Session
from Schemas.user_schema import UserUpdateRequest
from Database.models import User
from Authentication.password_handler import hash_password
from Authentication.redis_handler import redis_client

def register_user(request, db: Session):
    """
    Registers a new user.
    """

    # Check if email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    # Check if username already exists
    existing_username = (
        db.query(User)
        .filter(User.username == request.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken."
        )

    # Hash password
    hashed_password = hash_password(request.password)

    # Create user
    user = User(
        username=request.username,
        email=request.email,
        password=hashed_password
    )
#DEBUGGING LINES
    # print("REGISTER PASSWORD:", request.password)

    # hashed_password = hash_password(request.password)

    # print("REGISTER HASH:", hashed_password)
    # Save to database
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


#LOGIN SERVICE
from fastapi import HTTPException

from Authentication.password_handler import verify_password
from Authentication.jwt_create import create_token
from Authentication.redis_handler import redis_client

import uuid


def login_user(request, db: Session):
    """
    Authenticates a user and returns an access token.
    """

    # Find user by email
    user = (
        db.query(User)
        .filter(User.email == request.username)
        .first()
    )

    # print("Email entered:", request.username)
    # print("User found:", user)
    
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    #Verify password
#     print("Password matches:", verify_password(
#     request.password,
#     str(user.password)
# ))

    if not verify_password(
        request.password,
        str(user.password)
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    # Create a unique session id
    session_id = str(uuid.uuid4())

    # Store session in Redis
    redis_client.set(
        session_id,
        str(user.id)
    )

    # Create JWT
    access_token = create_token(
        {
            "user_id": user.id,
            "session_id": session_id
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

#GET CURRENT USER PROFILE
def get_current_user_profile(
    db: Session,
    current_user
):
    """
    Returns the profile of the
    authenticated user.
    """

    user = (
        db.query(User)
        .filter(
            User.id == current_user["user_id"]
        )
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    return user


#UPDATE USER ENDPOINT
def update_current_user(
    request: UserUpdateRequest,
    db: Session,
    current_user
):
    """
    Updates the authenticated user's profile.
    """

    user = (
        db.query(User)
        .filter(
            User.id == current_user["user_id"]
        )
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Check username uniqueness
    username_exists = (
        db.query(User)
        .filter(
            User.username == request.username,
            User.id != user.id
        )
        .first()
    )

    if username_exists:
        raise HTTPException(
            status_code=400,
            detail="Username already taken."
        )

    # Check email uniqueness
    email_exists = (
        db.query(User)
        .filter(
            User.email == request.email,
            User.id != user.id
        )
        .first()
    )

    if email_exists:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    # Update profile
    user.username = request.username
    user.email = request.email

    db.commit()
    db.refresh(user)

    return user


#LOGOUT SERVICE
def logout_user(current_user):
    """
    Logs out the authenticated user
    by removing their Redis session.
    """

    redis_client.delete(
        current_user["session_id"]
    )

    return {
        "message": "Successfully logged out."
    }


