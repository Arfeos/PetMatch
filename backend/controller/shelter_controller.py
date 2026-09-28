from typing import List

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from model.shelter_model import Shelter
from schema.shelter_schema import ShelterCreate, ShelterUpdate


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

def get_by_id(
    db: Session,
    shelter_id: int
) -> Shelter:

    try:
        shelter = db.query(Shelter).filter(
            Shelter.id == shelter_id
        ).first()

        if shelter is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Shelter not found"
            )

        return shelter

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting shelter: {str(error)}"
        )
def update_shelter(
    db: Session,
    shelter_id: int,
    shelter_data: ShelterUpdate
) -> Shelter:

    shelter = db.query(Shelter).filter(
        Shelter.id == shelter_id
    ).first()

    if shelter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shelter not found"
        )

    try:
        if shelter_data.name is not None:
            shelter.name = shelter_data.name

        if shelter_data.city is not None:
            shelter.city = shelter_data.city

        if shelter_data.phone is not None:
            shelter.phone = shelter_data.phone

        db.commit()
        db.refresh(shelter)

        return shelter

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in updating shelter: {str(error)}"
        )
def delete_shelter(
    db: Session,
    shelter_id: int
) -> None:

    shelter = db.query(Shelter).filter(
        Shelter.id == shelter_id
    ).first()

    if shelter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shelter not found"
        )

    try:
        db.delete(shelter)
        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in deleting shelter: {str(error)}"
        )