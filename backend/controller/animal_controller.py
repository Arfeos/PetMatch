from typing import List

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from model.animal_model import Animal
from model.shelter_model import Shelter
from schema.animal_schema import AnimalCreate, AnimalUpdate
from model.adoption_interest_model import AdoptionInterest

def get_all(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Animal]:

    try:
        return db.query(Animal).offset(skip).limit(limit).all()

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting animals: {str(error)}"
        )


def create_animal(
    db: Session,
    animal_data: AnimalCreate
) -> Animal:

    shelter = db.query(Shelter).filter(
        Shelter.id == animal_data.shelter_id
    ).first()

    if shelter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shelter not found"
        )

    new_animal = Animal(
        name=animal_data.name,
        species=animal_data.species,
        breed=animal_data.breed,
        age=animal_data.age,
        adopted=animal_data.adopted,
        shelter_id=animal_data.shelter_id
    )

    try:
        db.add(new_animal)
        db.commit()
        db.refresh(new_animal)

        return new_animal

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in creating animal: {str(error)}"
        )
def get_by_id(
    db: Session,
    animal_id: int
) -> Animal:

    try:
        animal = db.query(Animal).filter(
            Animal.id == animal_id
        ).first()

        if animal is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Animal not found"
            )

        return animal

    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in getting animal: {str(error)}"
        )
def update_animal(
    db: Session,
    animal_id: int,
    animal_data: AnimalUpdate
) -> Animal:

    animal = db.query(Animal).filter(
        Animal.id == animal_id
    ).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found"
        )

    # If the shelter is being changed, check that it exists
    if animal_data.shelter_id is not None:

        shelter = db.query(Shelter).filter(
            Shelter.id == animal_data.shelter_id
        ).first()

        if shelter is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Shelter not found"
            )

        animal.shelter_id = animal_data.shelter_id

    if animal_data.name is not None:
        animal.name = animal_data.name

    if animal_data.species is not None:
        animal.species = animal_data.species

    if animal_data.breed is not None:
        animal.breed = animal_data.breed

    if animal_data.age is not None:
        animal.age = animal_data.age

    if animal_data.adopted is not None:
        animal.adopted = animal_data.adopted

    try:
        db.commit()
        db.refresh(animal)

        return animal

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in updating animal: {str(error)}"
        )
def delete_animal(
    db: Session,
    animal_id: int
) -> None:

    animal = db.query(Animal).filter(
        Animal.id == animal_id
    ).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found"
        )

    adoption_interest = db.query(AdoptionInterest).filter(
        AdoptionInterest.animal_id == animal_id
    ).first()

    if adoption_interest is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete an animal with adoption interests"
        )

    try:
        db.delete(animal)
        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in deleting animal: {str(error)}"
        )
def delete_animal_cascade(
    db: Session,
    animal_id: int
) -> None:

    animal = db.query(Animal).filter(
        Animal.id == animal_id
    ).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found"
        )

    try:
        db.query(AdoptionInterest).filter(
            AdoptionInterest.animal_id == animal_id
        ).delete(
            synchronize_session=False
        )

        db.delete(animal)

        db.commit()

    except SQLAlchemyError as error:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error in cascading animal deletion: {str(error)}"
        )