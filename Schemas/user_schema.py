from pydantic import BaseModel, EmailStr
from datetime import datetime


#ACCOUNT CREATION MODELS
class UserRegister(BaseModel):

    username: str

    email: EmailStr

    password: str

class UserResponse(BaseModel):

    id: int

    username: str

    email: EmailStr

    class Config:
        from_attributes = True

# LOGIN MODELS

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserProfileResponse(BaseModel):

    id: int

    username: str

    email: EmailStr

    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdateRequest(BaseModel):

    username: str

    email: EmailStr

