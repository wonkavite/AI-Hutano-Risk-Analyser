from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,  Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from Database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=True)
    google_id = Column(String, unique=True, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    assessments = relationship(
    "Assessment",
    back_populates="user",
    cascade="all, delete"
)

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    age = Column(Integer, nullable=False)

    academic_pressure = Column(Integer, nullable=False)

    cgpa = Column(Float, nullable=False)

    study_satisfaction = Column(Integer, nullable=False)

    sleep_duration = Column(String, nullable=False)

    financial_stress = Column(Float, nullable=False)

    family_history = Column(Integer, nullable=False)

    dietary_habits = Column(String, nullable=False)
    degree = Column(String, nullable=False)

    prediction_probability = Column(Float, nullable=False)

    risk_level = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="assessments"
    )
