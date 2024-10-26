from fastapi import FastAPI, Response
from pptx import Presentation
from io import BytesIO

from bible_passage_api import CuvsPassageApi, KjvPassageApi
from data.bible import BibleBook
from base import BlankPresentation, PresentationBuilder, PresentationTemplate
from responsive_context import ResponsiveContext
from passage_context import PassageContext
from models import Passage, Verse

app = FastAPI()


@app.post("/bvpg/slides/bible-reading", response_class=Response)
def build_slide_bible_reading(passages: list[Passage]):
    output = BytesIO()
    slide = PresentationBuilder(
        presentation=BlankPresentation(), template=PresentationTemplate(
            Presentation("template/passage_template.pptx")), context=PassageContext(passages))

    slide.build()
    slide.presentation.save_file(output)
    return Response(output.getvalue(), media_type='application/pptx')


@app.post("/bvpg/slides/responsive-reading", response_class=Response)
async def build_slide_responsive_reading(passages: list[Passage]):
    output = BytesIO()
    slide = PresentationBuilder(
        presentation=BlankPresentation(), template=PresentationTemplate(
            Presentation("template/responsive_reading.pptx")), context=ResponsiveContext(passages))
    slide.build()
    slide.presentation.save_file(output)
    return Response(output.getvalue(), media_type='application/pptx')


@app.post("/bvpg/slides/passages", response_model=list[Passage])
async def passages(passages: list[Passage]) -> list[Passage]:
    return passages


@app.get("/bvpg/api/passage/rcuvss/books/{book}/chapters/{chapter}/verses/{start_verse}/{end_verse}")
async def rcuvss_passage(book: BibleBook, chapter: int, start_verse: int, end_verse: int):
    passage = Passage(
        book=book,
        start_verse=Verse(chapter=chapter, verse=start_verse),
        end_verse=Verse(chapter=chapter, verse=end_verse)
    )

    text = CuvsPassageApi().retrieve_passage(
        passage=passage
    )

    return text


@app.get("/bvpg/api/passage/kjv/books/{book}/chapters/{chapter}/verses/{start_verse}/{end_verse}")
async def kjv_passage(book: BibleBook, chapter: int, start_verse: int, end_verse: int):
    passage = Passage(
        book=book,
        start_verse=Verse(chapter=chapter, verse=start_verse),
        end_verse=Verse(chapter=chapter, verse=end_verse)
    )

    text = KjvPassageApi().retrieve_passage(
        passage=passage
    )

    return text


@app.get("/")
async def root():
    return {"message": "Hello World"}
