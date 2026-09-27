from sqlalchemy import Column, Integer, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship

from database.database import Base
from enums.adoption_status_enum import AdoptionStatus


class AdoptionInterest(Base):
    __tablename__ = "adoption_interests"

    id = Column(Integer, primary_key=True, index=True)

    adopter_id = Column(
        Integer,
        ForeignKey("adopters.id"),
        nullable=False
    )

    animal_id = Column(
        Integer,
        ForeignKey("animals.id"),
        nullable=False
    )

    date = Column(Date, nullable=False)

    status = Column(
        Enum(AdoptionStatus),
        nullable=False
    )

    adopter = relationship(
        "Adopter",
        back_populates="adoption_interests"
    )

    animal = relationship(
        "Animal",
        back_populates="adoption_interests"
    )