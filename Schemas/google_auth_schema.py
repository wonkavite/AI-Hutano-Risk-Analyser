from typing import Optional

from pydantic import BaseModel


class GoogleLoginRequest(BaseModel):
    id_token: str
    username: Optional[str] = None


class GoogleLinkRequest(BaseModel):
    id_token: str
    password: str