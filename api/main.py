from typing import Union


import sys


from fastapi import FastAPI
from utils import get_houses_similar_to_label

app = FastAPI()


@app.get("/housingFromText/")
def get_housingFromText(label: str):
    return get_houses_similar_to_label(label)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
