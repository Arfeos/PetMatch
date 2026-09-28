from typing import List

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from model.adoption_interest_model import AdoptionInterest
from model.adopter_model import Adopter
from model.animal_model import Animal
from schema.adoption_interest_schema import (
    AdoptionInterestCreate,
    AdoptionInterestUpdate
)


def get_all(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[AdoptionInterest]:

    try:
        return db.query(AdoptionInterest).offset(skip).limit(limit).all()

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting adoption interests: {str(error)}"
        )


def get_by_id(
    db: Session,
    adoption_interest_id: int
) -> AdoptionInterest:

    try:
        adoption_interest = db.query(AdoptionInterest).filter(
            AdoptionInterest.id == adoption_interest_id
        ).first()

        if adoption_interest is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Adoption interest not found"
            )

        return adoption_interest

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting adoption interest: {str(error)}"
        )


def create_adoption_interest(
    db: Session,
    adoption_interest_data: AdoptionInterestCreate
) -> AdoptionInterest:

    adopter = db.query(Adopter).filter(
        Adopter.id == adoption_interest_data.adopter_id
    ).first()

    if adopter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adopter not found"
        )

    animal = db.query(Animal).filter(
        Animal.id == adoption_interest_data.animal_id
    ).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found"
        )

    new_adoption_interest = AdoptionInterest(
        adopter_id=adoption_interest_data.adopter_id,
        animal_id=adoption_interest_data.animal_id,
        date=adoption_interest_data.date,
        status=adoption_interest_data.status
    )

    try:
        db.add(new_adoption_interest)
        db.commit()
        db.refresh(new_adoption_interest)

        return new_adoption_interest

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in creating adoption interest: {str(error)}"
        )


def update_adoption_interest(
    db: Session,
    adoption_interest_id: int,
    adoption_interest_data: AdoptionInterestUpdate
) -> AdoptionInterest:

    adoption_interest = db.query(AdoptionInterest).filter(
        AdoptionInterest.id == adoption_interest_id
    ).first()

    if adoption_interest is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adoption interest not found"
        )

    if adoption_interest_data.status is not None:
        adoption_interest.status = adoption_interest_data.status

    try:
        db.commit()
        db.refresh(adoption_interest)

        return adoption_interest

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in updating adoption interest: {str(error)}"
        )


def delete_adoption_interest(
    db: Session,
    adoption_interest_id: int
) -> None:

    adoption_interest = db.query(AdoptionInterest).filter(
        AdoptionInterest.id == adoption_interest_id
    ).first()

    if adoption_interest is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adoption interest not found"
        )

    try:
        db.delete(adoption_interest)
        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in deleting adoption interest: {str(error)}"
        )