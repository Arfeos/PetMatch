from fastapi import FastAPI

from model import *

app = FastAPI(title="PetMatch API")


@app.get("/")
def root():
    return {"message": "PetMatch API is running"}