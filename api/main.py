from typing import Union


import sys


from utils import get_houses_similar_to_label, get_housing_from_image
from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/housingFromText/")
def get_housingFromText(label: str):
    return get_houses_similar_to_label(label)


@app.post("/housingFromImage/")
async def create_file(file: UploadFile = File(...)):
    return get_housing_from_image(file)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
