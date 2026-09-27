from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class ShelterBase(BaseModel):

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Name of the shelter",
        examples=["Patas Peludas"]
    )

    city: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="City where the shelter is located",
        examples=["Madrid"]
    )

    phone: str = Field(
        ...,
        min_length=9,
        max_length=15,
        description="Shelter phone number",
        examples=["612345678"]
    )


class ShelterCreate(ShelterBase):
    pass


class ShelterUpdate(BaseModel):

    name: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    city: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    phone: Optional[str] = Field(
        None,
        min_length=9,
        max_length=15
    )


class ShelterResponse(ShelterBase):

    id: int = Field(
        ...,
        description="Primary key of the shelter",
        examples=[1]
    )

    model_config = ConfigDict(from_attributes=True)