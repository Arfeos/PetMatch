from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from controller.adoption_interest_controller import (
    get_all,
    get_by_id,
    create_adoption_interest,
    update_adoption_interest,
    delete_adoption_interest
)
from database.database import get_db
from schema.adoption_interest_schema import (
    AdoptionInterestCreate,
    AdoptionInterestUpdate,
    AdoptionInterestResponse
)


router = APIRouter(
    prefix="/adoption-interests",
    tags=["Adoption Interests"]
)


@router.get(
    "/",
    response_model=List[AdoptionInterestResponse],
    status_code=status.HTTP_200_OK
)
def get_adoption_interests(
    db: Session = Depends(get_db)
):
    return get_all(db)


@router.get(
    "/{adoption_interest_id}",
    response_model=AdoptionInterestResponse,
    status_code=status.HTTP_200_OK
)
def get_adoption_interest(
    adoption_interest_id: int,
    db: Session = Depends(get_db)
):
    return get_by_id(db, adoption_interest_id)


@router.post(
    "/",
    response_model=AdoptionInterestResponse,
    status_code=status.HTTP_201_CREATED
)
def post_adoption_interest(
    adoption_interest_data: AdoptionInterestCreate,
    db: Session = Depends(get_db)
):
    return create_adoption_interest(
        db,
        adoption_interest_data
    )


@router.put(
    "/{adoption_interest_id}",
    response_model=AdoptionInterestResponse,
    status_code=status.HTTP_200_OK
)
def put_adoption_interest(
    adoption_interest_id: int,
    adoption_interest_data: AdoptionInterestUpdate,
    db: Session = Depends(get_db)
):
    return update_adoption_interest(
        db,
        adoption_interest_id,
        adoption_interest_data
    )


@router.delete(
    "/{adoption_interest_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def remove_adoption_interest(
    adoption_interest_id: int,
    db: Session = Depends(get_db)
):
    delete_adoption_interest(
        db,
        adoption_interest_id
    )