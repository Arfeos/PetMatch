from typing import List

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from model.shelter_model import Shelter
from schema.shelter_schema import ShelterCreate


def get_all(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Shelter]:

    try:
        return db.query(Shelter).offset(skip).limit(limit).all()

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting shelters: {str(error)}"
        )


def create_shelter(
    db: Session,
    shelter_data: ShelterCreate
) -> Shelter:

    new_shelter = Shelter(
        name=shelter_data.name,
        city=shelter_data.city,
        phone=shelter_data.phone
    )

    try:
        db.add(new_shelter)
        db.commit()
        db.refresh(new_shelter)

        return new_shelter

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in creating shelter: {str(error)}"
        )