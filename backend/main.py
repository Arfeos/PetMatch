from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.shelter_routes import router as shelter_router
from routes.animal_routes import router as animal_router
from routes.adopter_routes import router as adopter_router
from routes.adoption_interest_routes import router as adoption_interest_router


app = FastAPI(
    title="PetMatch API",
    description="API for managing animal adoption",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(shelter_router)
app.include_router(animal_router)
app.include_router(adopter_router)
app.include_router(adoption_interest_router)


@app.get("/")
def root():
    return {
        "message": "PetMatch API is running"
    }