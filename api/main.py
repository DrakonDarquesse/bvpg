from fastapi import FastAPI, Response
from fastapi.responses import FileResponse
from pptx import Presentation
from io import BytesIO

from bible_passage_api import CuvsPassageApi
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


@app.post("/bvpg/slides/passage", response_model=list[Passage])
async def passage(passages: list[Passage]) -> list[Passage]:

    return passages


@app.get("/")
async def root():
    return {"message": "Hello World"}
