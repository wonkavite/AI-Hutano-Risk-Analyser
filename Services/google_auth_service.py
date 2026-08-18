from sqlalchemy.orm import Session
from fastapi import HTTPException
from Database.models import User
from typing import Optional
from Authentication.username_generator import generate_username
from Authentication.session_handler import create_authenticated_session
from Authentication.password_handler import verify_password
from Authentication.firebase_auth import verify_firebase_token



#FINDING USER BY GOOGLE ID
def find_user_by_google_id(
    google_id: str,
    db: Session
):
    """
    Finds a user using their Firebase/Google UID.
    Returns the User object if found, otherwise None.
    """

    return (
        db.query(User)
        .filter(User.google_id == google_id)
        .first()
    )

#FINDING USER BY EMAIL

def find_user_by_email(
    email: str,
    db: Session
):
    """
    Finds a user using their email address.
    Returns the User object if found, otherwise None.
    """

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


#finding user by username
def find_user_by_username(
    username: str,
    db: Session
):
    """
    Finds a user using their username.
    Returns the User object if found, otherwise None.
    """

    return (
        db.query(User)
        .filter(User.username == username)
        .first()
    )


#creating the user

def create_google_user(
    username: str,
    email: str,
    google_id: str,
    db: Session
):
    """
    Creates a new user authenticated through Google.

    Google users do not have a local password,
    so password is stored as NULL.
    """

    user = User(
        username=username,
        email=email,
        password=None,
        google_id=google_id
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user




#Google token verification



def get_google_user_data(id_token: str):
    """
    Verifies the Firebase ID token and extracts
    the Google/Firebase identity information we need.
    """

    decoded_token = verify_firebase_token(id_token)

    google_id = decoded_token.get("uid")
    email = decoded_token.get("email")
    display_name = decoded_token.get("name")

    if not google_id:
        raise ValueError("Firebase token does not contain a user ID.")

    if not email:
        raise ValueError("Firebase token does not contain an email.")

    return {
        "google_id": google_id,
        "email": email,
        "display_name": display_name
    }





#LOGIN USER

def google_login_user(
    id_token: str,
    username: Optional[str],
    db: Session
):
    """
    Handles Google/Firebase authentication.

    Flow:
    1. Verify Firebase token.
    2. Check existing Google account.
    3. Check existing email account.
    4. For a new account, validate the username.
    5. Create the Google user.
    """

    # --------------------------------------------------
    # 1. Verify Firebase token
    # --------------------------------------------------

    try:
        google_data = get_google_user_data(id_token)
    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

    google_id = google_data["google_id"]
    email = google_data["email"]
    display_name = google_data["display_name"]
    
    # --------------------------------------------------
    # 2. Check whether Google account is already linked
    # --------------------------------------------------

    user = find_user_by_google_id(
        google_id,
        db
    )

    if user:

      return create_authenticated_session(user)

    # --------------------------------------------------
    # 3. Check whether this email already has an account
    # --------------------------------------------------

    existing_user = find_user_by_email(
        email,
        db
    )

    if existing_user:
      raise HTTPException(
        status_code=401,
        detail={
            "status": "account_link_required",
            "message": (
                "An account already exists with this email. "
                "Please enter your password to link your Google account."
            )
        }
    )

    # --------------------------------------------------
    # 4. Generate suggested username
    # --------------------------------------------------

    if username is None:
        suggested_username = generate_username(
            display_name,
            email
        )

        username_user = find_user_by_username(
            suggested_username,
            db
        )

        if username_user:
          raise HTTPException(
        status_code=409,
        detail={
            "status": "username_required",
            "message": (
                f"Your username '{suggested_username}' is already taken. "
                "Please choose another username."
            ),
            "suggested_username": suggested_username
        }
    )

        username = suggested_username

    # --------------------------------------------------
    # 5. User supplied a username
    # --------------------------------------------------

    else:

        username_user = find_user_by_username(
            username,
            db
        )

        if username_user:
          raise HTTPException(
        status_code=409,
        detail={
            "status": "username_taken",
            "message": (
                f"Your username '{username}' is already taken. "
                "Please choose another username."
            )
        }
    )

    # --------------------------------------------------
    # 6. Create Google user
    # --------------------------------------------------

    user = create_google_user(
    username=username,
    email=email,
    google_id=google_id,
    db=db
)

    return create_authenticated_session(user)


#Link Account
def link_google_account(
    id_token: str,
    password: str,
    db: Session
):
    """
    Verifies the Firebase token and existing account password,
    then links the Firebase/Google account to that account.
    """

    # Verify Firebase token
    try:
        google_data = get_google_user_data(id_token)
    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

    google_id = google_data["google_id"]
    email = google_data["email"]

    # Find the existing account by email
    user = find_user_by_email(
        email,
        db
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="No existing account was found."
        )

    # Check whether this Google account is already linked
    existing_google_user = find_user_by_google_id(
    google_id,
    db
)

    if existing_google_user is not None:
         raise HTTPException(
        status_code=409,
        detail="This Google account is already linked to another account."
    )

    # Verify existing account password
    if not verify_password(
        password,
        str(user.password)
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password."
        )

    # Link Google account
    user.google_id = google_id

    db.commit()
    db.refresh(user)

    # Create authenticated session
    return create_authenticated_session(user)