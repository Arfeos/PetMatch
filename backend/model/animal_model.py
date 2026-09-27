from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship

from database.database import Base
from enums.species_enum import Species


class Animal(Base):
    __tablename__ = "animals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    species = Column(Enum(Species), nullable=False)
    breed = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    adopted = Column(Boolean, default=False)

    shelter_id = Column(
        Integer,
        ForeignKey("shelters.id"),
        nullable=False
    )

    shelter = relationship(
        "Shelter",
        back_populates="animals"
    )

    adoption_interests = relationship(
        "AdoptionInterest",
        back_populates="animal"
    )