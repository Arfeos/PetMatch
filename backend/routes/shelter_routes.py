from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from controller.shelter_controller import (
    get_all,
    get_by_id,
    create_shelter,
    update_shelter,
    delete_shelter
)
from database.database import get_db
from schema.shelter_schema import ShelterCreate, ShelterResponse, ShelterUpdate

# Shelter
router = APIRouter(
    prefix="/shelters",
    tags=["Shelters"]
)


@router.get(
    "/",
    response_model=List[ShelterResponse],
    status_code=status.HTTP_200_OK
)
def get_shelters(
    db: Session = Depends(get_db)
):
    return get_all(db)


@router.post(
    "/",
    response_model=ShelterResponse,
    status_code=status.HTTP_201_CREATED
)
def post_shelter(
    shelter_data: ShelterCreate,
    db: Session = Depends(get_db)
):
    return create_shelter(db, shelter_data)
@router.get(
    "/{shelter_id}",
    response_model=ShelterResponse,
    status_code=status.HTTP_200_OK
)
def get_shelter(
    shelter_id: int,
    db: Session = Depends(get_db)
):
    return get_by_id(db, shelter_id)
@router.put(
    "/{shelter_id}",
    response_model=ShelterResponse,
    status_code=status.HTTP_200_OK
)
def put_shelter(
    shelter_id: int,
    shelter_data: ShelterUpdate,
    db: Session = Depends(get_db)
):
    return update_shelter(
        db,
        shelter_id,
        shelter_data
    )
@router.delete(
    "/{shelter_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_shelter(
    shelter_id: int,
    db: Session = Depends(get_db)
):
    delete_shelter(db, shelter_id)