from fastapi import FastAPI
from routes.shelter_routes import router as shelter_router
app = FastAPI(
    title="PetMatch API"
)
app.include_router(shelter_router)
@app.get("/")
def root():
    return {"message": "PetMatch API is running"}