from typing import List

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from model.adopter_model import Adopter
from schema.adopter_schema import AdopterCreate, AdopterUpdate
from model.adoption_interest_model import AdoptionInterest

def get_all(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Adopter]:

    try:
        return db.query(Adopter).offset(skip).limit(limit).all()

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting adopters: {str(error)}"
        )


def get_by_id(
    db: Session,
    adopter_id: int
) -> Adopter:

    try:
        adopter = db.query(Adopter).filter(
            Adopter.id == adopter_id
        ).first()

        if adopter is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Adopter not found"
            )

        return adopter

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting adopter: {str(error)}"
        )


def create_adopter(
    db: Session,
    adopter_data: AdopterCreate
) -> Adopter:

    existing_adopter = db.query(Adopter).filter(
        Adopter.email == adopter_data.email
    ).first()

    if existing_adopter is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An adopter with this email already exists"
        )

    new_adopter = Adopter(
        name=adopter_data.name,
        email=adopter_data.email,
        phone=adopter_data.phone
    )

    try:
        db.add(new_adopter)
        db.commit()
        db.refresh(new_adopter)

        return new_adopter

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in creating adopter: {str(error)}"
        )


def update_adopter(
    db: Session,
    adopter_id: int,
    adopter_data: AdopterUpdate
) -> Adopter:

    adopter = db.query(Adopter).filter(
        Adopter.id == adopter_id
    ).first()

    if adopter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adopter not found"
        )

    if adopter_data.email is not None:

        existing_adopter = db.query(Adopter).filter(
            Adopter.email == adopter_data.email,
            Adopter.id != adopter_id
        ).first()

        if existing_adopter is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An adopter with this email already exists"
            )

        adopter.email = adopter_data.email

    if adopter_data.name is not None:
        adopter.name = adopter_data.name

    if adopter_data.phone is not None:
        adopter.phone = adopter_data.phone

    try:
        db.commit()
        db.refresh(adopter)

        return adopter

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in updating adopter: {str(error)}"
        )


def delete_adopter(
    db: Session,
    adopter_id: int
) -> None:

    adopter = db.query(Adopter).filter(
        Adopter.id == adopter_id
    ).first()

    if adopter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adopter not found"
        )

    adoption_interest = db.query(AdoptionInterest).filter(
        AdoptionInterest.adopter_id == adopter_id
    ).first()

    if adoption_interest is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete an adopter with adoption interests"
        )

    try:
        db.delete(adopter)
        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in deleting adopter: {str(error)}"
        )
def delete_adopter_cascade(
    db: Session,
    adopter_id: int
) -> None:

    adopter = db.query(Adopter).filter(
        Adopter.id == adopter_id
    ).first()

    if adopter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Adopter not found"
        )

    try:
        db.query(AdoptionInterest).filter(
            AdoptionInterest.adopter_id == adopter_id
        ).delete(
            synchronize_session=False
        )

        db.delete(adopter)

        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in cascading adopter deletion: {str(error)}"
        )