from pptx import Presentation
from data.bible import BibleBookVerbose
from base import ContextMixin, PresentationBuilder, PresentationTemplateMixin, duplicate_slide, render_slide_data
from bible_passage_api import PassageList
from models import Passage
from environment import env


class ResponsiveContext(ContextMixin):
    passages: list[Passage] = []
    combined_verses = []

    def get_context(self):
        passage = self.get_passages()[0]
        self.combined_verses = PassageList(passage=passage).passages
        return [self.cover(), *self.responsive(), self.responsive_end()]

    def get_passages(self):
        return self.passages

    def cover(self):
        passage = self.get_passages()[0]
        return {
            'title': 'cover',
            'data': {
                'title': '启应经文 Responsive Reading',
                'chi_book': BibleBookVerbose[passage.book.name].value,
                'eng_book': passage.book.name,
                'chapter_verse': f'{passage.start_verse.chapter}: {passage.start_verse.verse}-{passage.end_verse.verse}'
            }
        }

    def responsive(self):
        slide_contexts = []
        verses_len = len(self.combined_verses)

        range_limit = verses_len if verses_len % 2 == 0 else verses_len - 1
        for i in range(0, range_limit, 2):
            slide_contexts.append({
                'title': 'responsive',
                'data': {
                    'chi_open': "".join(self.combined_verses[i]['chi']),
                    'eng_open': "".join(self.combined_verses[i]['eng']),
                    'chi_close': "".join(self.combined_verses[i+1]['chi']),
                    'eng_close': "".join(self.combined_verses[i+1]['eng']),
                    'title': ''
                }
            })
        return slide_contexts

    def responsive_end(self):
        last_index = len(self.combined_verses) - 1

        return {
            'title': 'responsive_end',
            'data': {
                'chi_close': "".join(self.combined_verses[last_index]['chi']),
                'eng_close': "".join(self.combined_verses[last_index]['eng']),
                'title': ''
            }
        }


class ResponsivePresentationBuilder(PresentationBuilder, PresentationTemplateMixin, ResponsiveContext):
    template = Presentation("template/responsive_reading.pptx")

    def __init__(self, save_file_name: str = 'slide.pptx', base_name: str | None = None, passages: list[Passage] = []) -> None:
        super().__init__()
        self.save_file_name = save_file_name
        self.base_file = Presentation(base_name)
        self.passages = passages

    def build(self):
        """
        get slide templates and use them to add new slide to base file
        """

        print("start building slides")
        contexts = self.get_context()
        for context in contexts:
            self.build_slide(context)

    def build_slide(self, context):
        print(context["title"])
        template_slide = self.get_slide(context["title"])
        new_slide = self.new_slide()

        duplicate_slide(template_slide, new_slide)
        render_slide_data(new_slide, context, env)

# passages = [Passage(book=BibleBook.proverbs, start_verse=Verse(
#     chapter=16, verse=1), end_verse=Verse(chapter=16, verse=8))]
# slide = ResponsivePresentationBuilder(
#     base_name="template/base_wide.pptx", passages=passages)
# slide.build()
# slide.save_file()
