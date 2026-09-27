from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database.database import Base


class Adopter(Base):
    __tablename__ = "adopters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=False)

    adoption_interests = relationship(
        "AdoptionInterest",
        back_populates="adopter"
    )