from pydantic import BaseModel, EmailStr

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



