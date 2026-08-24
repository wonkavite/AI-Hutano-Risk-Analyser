import uuid

from Authentication.jwt_create import create_token
from Authentication.redis_handler import redis_client


def create_authenticated_session(user):
    """
    Creates a Redis session and JWT for an authenticated user.
    """

    # Create unique session ID
    session_id = str(uuid.uuid4())

    # Store session in Redis
    redis_client.set(
        session_id,
        str(user.id),
        ex=30 * 60
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