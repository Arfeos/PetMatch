from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from enums.species_enum import Species


class AnimalBase(BaseModel):

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Name of the animal",
        examples=["Luna"]
    )

    species: Species = Field(
        ...,
        description="Species of the animal",
        examples=["cat"]
    )

    breed: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Breed of the animal",
        examples=["European Shorthair"]
    )

    age: int = Field(
        ...,
        ge=0,
        description="Age of the animal",
        examples=[3]
    )

    adopted: bool = Field(
        default=False,
        description="Whether the animal has been adopted",
        examples=[False]
    )

    shelter_id: int = Field(
        ...,
        description="ID of the shelter",
        examples=[1]
    )


class AnimalCreate(AnimalBase):
    pass


class AnimalUpdate(BaseModel):

    name: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    species: Optional[Species] = None

    breed: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    age: Optional[int] = Field(
        None,
        ge=0
    )

    adopted: Optional[bool] = None

    shelter_id: Optional[int] = None


class AnimalResponse(AnimalBase):

    id: int = Field(
        ...,
        description="Primary key of the animal",
        examples=[1]
    )

    model_config = ConfigDict(from_attributes=True)