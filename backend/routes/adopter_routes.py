from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from controller.adopter_controller import (
    get_all,
    get_by_id,
    create_adopter,
    update_adopter,
    delete_adopter,
    delete_adopter_cascade
)
from database.database import get_db
from schema.adopter_schema import AdopterCreate, AdopterUpdate, AdopterResponse


router = APIRouter(
    prefix="/adopters",
    tags=["Adopters"]
)


@router.get(
    "/",
    response_model=List[AdopterResponse],
    status_code=status.HTTP_200_OK
)
def get_adopters(
    db: Session = Depends(get_db)
):
    return get_all(db)


@router.get(
    "/{adopter_id}",
    response_model=AdopterResponse,
    status_code=status.HTTP_200_OK
)
def get_adopter(
    adopter_id: int,
    db: Session = Depends(get_db)
):
    return get_by_id(db, adopter_id)


@router.post(
    "/",
    response_model=AdopterResponse,
    status_code=status.HTTP_201_CREATED
)
def post_adopter(
    adopter_data: AdopterCreate,
    db: Session = Depends(get_db)
):
    return create_adopter(db, adopter_data)


@router.put(
    "/{adopter_id}",
    response_model=AdopterResponse,
    status_code=status.HTTP_200_OK
)
def put_adopter(
    adopter_id: int,
    adopter_data: AdopterUpdate,
    db: Session = Depends(get_db)
):
    return update_adopter(
        db,
        adopter_id,
        adopter_data
    )


@router.delete(
    "/{adopter_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_adopter(
    adopter_id: int,
    db: Session = Depends(get_db)
):
    delete_adopter(db, adopter_id)

@router.delete(
    "/{adopter_id}/cascade",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_adopter_cascade(
    adopter_id: int,
    db: Session = Depends(get_db)
):
    delete_adopter_cascade(db, adopter_id)