from enum import Enum
from pydantic import BaseModel

from data.bible import BibleBook


class Verse(BaseModel):
    chapter: int
    verse: int


class Passage(BaseModel):
    book: BibleBook
    start_verse: Verse
    end_verse: Verse

    def is_same_chapter(self):
        return self.start_verse.chapter == self.end_verse.chapter
