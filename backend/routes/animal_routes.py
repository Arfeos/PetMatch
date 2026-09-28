from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from controller.animal_controller import (
    get_all,
    get_by_id,
    create_animal,
    update_animal,
    delete_animal,
    delete_animal_cascade
)
from database.database import get_db
from schema.animal_schema import AnimalCreate,AnimalUpdate, AnimalResponse


router = APIRouter(
    prefix="/animals",
    tags=["Animals"]
)


@router.get(
    "/",
    response_model=List[AnimalResponse],
    status_code=status.HTTP_200_OK
)
def get_animals(
    db: Session = Depends(get_db)
):
    return get_all(db)


@router.post(
    "/",
    response_model=AnimalResponse,
    status_code=status.HTTP_201_CREATED
)
def post_animal(
    animal_data: AnimalCreate,
    db: Session = Depends(get_db)
):
    return create_animal(db, animal_data)
@router.get(
    "/{animal_id}",
    response_model=AnimalResponse,
    status_code=status.HTTP_200_OK
)
def get_animal(
    animal_id: int,
    db: Session = Depends(get_db)
):
    return get_by_id(db, animal_id)
@router.put(
    "/{animal_id}",
    response_model=AnimalResponse,
    status_code=status.HTTP_200_OK
)
def put_animal(
    animal_id: int,
    animal_data: AnimalUpdate,
    db: Session = Depends(get_db)
):
    return update_animal(
        db,
        animal_id,
        animal_data
    )
@router.delete(
    "/{animal_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_animal(
    animal_id: int,
    db: Session = Depends(get_db)
):
    delete_animal(db, animal_id)
@router.delete(
    "/{animal_id}/cascade",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_animal_cascade(
    animal_id: int,
    db: Session = Depends(get_db)
):
    delete_animal_cascade(db, animal_id)