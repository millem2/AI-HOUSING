import sys
from typing import Union

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils import get_houses_similar_to_label, get_housing_from_image

app = FastAPI()

origins = ["http://localhost:5173/", "http://localhost", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/housingFromText/")
def get_housingFromText(label: str):
    return get_houses_similar_to_label(label)


@app.post("/housingFromImage/")
async def create_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
    # return get_housing_from_image(file)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
