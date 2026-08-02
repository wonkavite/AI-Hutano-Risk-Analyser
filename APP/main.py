from fastapi import FastAPI
from Routes.user_route import (
    router as user_router
)
from Database.database import Base, engine
from Database.models import User
from Routes.auth_route import (
    router as auth_router
)
from Routes.assessment_route import (
    router as assessment_router
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI application
app = FastAPI(
    title="Student Depression Risk Screening System",
    version="1.0.0"
)

# Register routers
app.include_router(auth_router)
app.include_router(assessment_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Student Depression Risk Screening System"
    }



#uvicorn APP.main:app --reload
