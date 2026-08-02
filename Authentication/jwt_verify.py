from jose import jwt, JWTError

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from Authentication.redis_handler import redis_client
from Authentication.jwt_create import (
    SECRET_KEY,
    ALGORITHM
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def verify_token(
    token: str = Depends(oauth2_scheme)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")
        session_id = payload.get("session_id")

        if user_id is None or session_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token."
            )

        redis_user_id = redis_client.get(session_id)

        if redis_user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Your session has expired. Please login again."
            )

        if redis_user_id != str(user_id):
            raise HTTPException(
                status_code=401,
                detail="Invalid session."
            )

        return {"user_id":user_id,
                "session_id": session_id
                }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Access forbidden. Please login again."
        )