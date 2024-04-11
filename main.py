from enum import Enum
from typing import Annotated, Any

from fastapi import FastAPI, Query

from pydantic import BaseModel


class BibleBook(int, Enum):
    genesis = 1
    exodus = 2


class Verse(BaseModel):
    chapter: int
    verse: int


class Passage(BaseModel):
    book: BibleBook
    start_verse: Verse
    end_verse: Verse


app = FastAPI()


@app.post("/bvpg/slides/passage", response_model=list[Passage])
async def passage(passages: list[Passage]) -> list[Passage]:

    return passages


@app.get("/")
async def root():
    return {"message": "Hello World"}
