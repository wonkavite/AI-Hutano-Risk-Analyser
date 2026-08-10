from jose import jwt
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv
from typing import cast



load_dotenv()


try:
    SECRET_KEY = os.environ["JWT_SECRET_KEY"]
except KeyError:
    raise RuntimeError("JWT_SECRET_KEY is not set in the environment.")

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30
def create_token(payload: dict):

    data = payload.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    data.update({
        "exp": expire
    })

    token = jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token