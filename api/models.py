from enum import Enum
from pydantic import BaseModel


class BibleBook(int, Enum):
    genesis = 1
    exodus = 2
    romans = 45
    proverbs = 20
    john = 43


class Verse(BaseModel):
    chapter: int
    verse: int


class Passage(BaseModel):
    book: BibleBook
    start_verse: Verse
    end_verse: Verse
