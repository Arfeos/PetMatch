from typing import Optional
from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from enums.adoption_status_enum import AdoptionStatus


class AdoptionInterestBase(BaseModel):

    adopter_id: int = Field(
        ...,
        description="ID of the adopter",
        examples=[1]
    )

    animal_id: int = Field(
        ...,
        description="ID of the animal",
        examples=[1]
    )

    date: date = Field(
        ...,
        description="Date of the adoption interest",
        examples=["2026-09-27"]
    )

    status: AdoptionStatus = Field(
        default=AdoptionStatus.PENDING,
        description="Status of the adoption interest",
        examples=["pending"]
    )


class AdoptionInterestCreate(AdoptionInterestBase):
    pass


class AdoptionInterestUpdate(BaseModel):

    status: Optional[AdoptionStatus] = None


class AdoptionInterestResponse(AdoptionInterestBase):

    id: int = Field(
        ...,
        description="Primary key of the adoption interest",
        examples=[1]
    )

    model_config = ConfigDict(from_attributes=True)