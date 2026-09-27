from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class AdopterBase(BaseModel):

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Name of the adopter",
        examples=["Laura García"]
    )

    email: str = Field(
        ...,
        min_length=5,
        max_length=150,
        description="Email of the adopter",
        examples=["laura@example.com"]
    )

    phone: str = Field(
        ...,
        min_length=9,
        max_length=15,
        description="Phone number of the adopter",
        examples=["612345678"]
    )


class AdopterCreate(AdopterBase):
    pass


class AdopterUpdate(BaseModel):

    name: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    email: Optional[str] = Field(
        None,
        min_length=5,
        max_length=150
    )

    phone: Optional[str] = Field(
        None,
        min_length=9,
        max_length=15
    )


class AdopterResponse(AdopterBase):

    id: int = Field(
        ...,
        description="Primary key of the adopter",
        examples=[1]
    )

    model_config = ConfigDict(from_attributes=True)