from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from controller.shelter_controller import get_all, create_shelter
from database.database import get_db
from schema.shelter_schema import ShelterCreate, ShelterResponse


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