from fastapi import FastAPI
from routes.animal_routes import router as animal_router
from routes.shelter_routes import router as shelter_router
from routes.adopter_routes import router as adopter_router
app = FastAPI(
    title="PetMatch API"
)
app.include_router(shelter_router)
app.include_router(animal_router)
app.include_router(adopter_router)