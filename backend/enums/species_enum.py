from enum import Enum


class Species(str, Enum):
    DOG = "dog"
    CAT = "cat"
    BIRD = "bird"
    REPTILE = "reptile"