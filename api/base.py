from pptx.enum.dml import MSO_FILL  # type: ignore
from renderer import env


def duplicate_slide(source_slide, target_slide):
    """
    copy background (if its solid color) and all texts along with stylings.
    """

    # set background is its solid fill
    try:

        if not source_slide.follow_master_background:
            if source_slide.background.fill.type == MSO_FILL.SOLID:
                target_slide.background.fill.solid()
                target_slide.background.fill.fore_color.rgb = source_slide.background.fill.fore_color.rgb
    except:
        pass

    title = source_slide.shapes.title

    target_title = target_slide.shapes.title

    target_title.left = title.left
    target_title.top = title.top
    target_title.width = title.width
    target_title.height = title.height

    target_title.text_frame.word_wrap = True
    target_title.text_frame.vertical_anchor = title.text_frame.vertical_anchor

    for paragraph in title.text_frame.paragraphs:
        # when iterating paragraph, update the last paragraph in new_shape.text_frame
        new_paragraph = target_title.text_frame.paragraphs[len(
            target_title.text_frame.paragraphs)-1]
        new_paragraph.alignment = paragraph.alignment
        # print(new_paragraph.alignment)

        for run in paragraph.runs:
            new_run = new_paragraph.add_run()
            new_run.text = run.text
            new_run.font.name = run.font.name
            new_run.font.size = run.font.size
            new_run.font.bold = run.font.bold
            new_run.font.italic = run.font.italic
            new_run.font.underline = run.font.underline
            new_run.font._element.set(
                'baseline', run.font._element.get('baseline', '0'))
            if run.font.color.rgb is not None:
                new_run.font.color.rgb = run.font.color.rgb
                print(new_run.font.color.rgb)

        if len(target_title.text_frame.paragraphs) != len(title.text_frame.paragraphs):
            target_title.text_frame.add_paragraph()

    for shape in source_slide.shapes:
        if not shape.has_text_frame:
            continue

        if shape == title:
            continue

        new_shape = target_slide.shapes.add_textbox(shape.left, shape.top, shape.width,
                                                    shape.height)  # add a new textbox to the slide
        new_shape.text_frame.word_wrap = True
        new_shape.text_frame.vertical_anchor = shape.text_frame.vertical_anchor
        for paragraph in shape.text_frame.paragraphs:
            # when iterating paragraph, update the last paragraph in new_shape.text_frame
            new_paragraph = new_shape.text_frame.paragraphs[len(
                new_shape.text_frame.paragraphs)-1]
            new_paragraph.alignment = paragraph.alignment

            for run in paragraph.runs:
                new_run = new_paragraph.add_run()
                new_run.text = run.text
                new_run.font.name = run.font.name
                new_run.font.size = run.font.size
                new_run.font.bold = run.font.bold
                new_run.font.italic = run.font.italic
                new_run.font.underline = run.font.underline
                new_run.font._element.set(
                    'baseline', run.font._element.get('baseline', '0'))
                if run.font.color.rgb is not None:
                    new_run.font.color.rgb = run.font.color.rgb

            if len(new_shape.text_frame.paragraphs) != len(shape.text_frame.paragraphs):
                new_shape.text_frame.add_paragraph()

# renderer as a class that takes in env


def render_slide_data(slide, context):

    slide.shapes.title.text_frame.paragraphs[0].runs[0].text = context['data'].get(
        'title', slide.shapes.title.text)
    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue

        for paragraph in shape.text_frame.paragraphs:

            for run in paragraph.runs:
                run.text = env.from_string(
                    run.text).render(context['data'])


class PresentationTemplateMixin:
    template = None

    def get_template(self):
        return self.template

    def get_slides(self):
        print("getting slides")
        # only returns slide with title
        return list(filter(lambda slide: bool(slide.shapes.title), self.get_template().slides))

    def get_slide(self, title):
        return next(
            (slide for slide in self.get_slides() if slide.shapes.title.text == title))


# TODO: set as enum or something? or just park it under presentation builder
TITLE_SLIDE_LAYOUT_INDEX = 5


class PresentationBuilder:
    base_file = None
    save_file_name: str | None = None

    def get_base_file(self):
        return self.base_file

    def save_file(self):
        self.base_file.save(self.save_file_name)

    def new_slide(self):
        base_file = self.get_base_file()
        return base_file.slides.add_slide(
            base_file.slide_layouts[TITLE_SLIDE_LAYOUT_INDEX])

    def build(self):
        raise NotImplementedError("Should have implemented this")


class ContextMixin:

    def get_context(self):
        raise NotImplementedError("Should have implemented this")
