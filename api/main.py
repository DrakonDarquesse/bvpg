from typing import Annotated, Any
from fastapi import FastAPI, Query
from fastapi.responses import FileResponse

from models import BibleBook, Passage, Verse
from presentation_builder import BibleVersePresentationBuilder, ResponsivePresentationBuilder

app = FastAPI()


@app.post("/bvpg/slides/bible-reading", response_class=FileResponse)
async def build_slide_bible_reading(passages: list[Passage]):
    slide = BibleVersePresentationBuilder(
        base_name="base_wide.pptx", passages=passages)
    slide.build()
    slide.save_file()
    return "slide.pptx"


@app.post("/bvpg/slides/responsive-reading", response_class=FileResponse)
async def build_slide_responsive_reading(passages: list[Passage]):
    slide = ResponsivePresentationBuilder(
        base_name="base_wide.pptx", passages=passages)
    slide.build()
    slide.save_file()
    return "slide.pptx"


@app.post("/bvpg/slides/passage", response_model=list[Passage])
async def passage(passages: list[Passage]) -> list[Passage]:

    return passages


@app.get("/")
async def root():
    return {"message": "Hello World"}
