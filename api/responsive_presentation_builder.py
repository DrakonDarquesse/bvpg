from pptx import Presentation
from data.bible import BibleBookVerbose
from base import ContextMixin, PresentationBuilder, PresentationTemplateMixin, duplicate_slide, render_slide_data
from bible_passage_api import CuvsPassageApi, KjvPassageApi
from models import BibleBook, Passage, Verse
from environment import env


class ResponsiveContext(ContextMixin):
    passages: list[Passage] = []

    def get_context(self):
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
        passage = self.get_passages()[0]
        english_passage_api = KjvPassageApi()
        chinese_passage_api = CuvsPassageApi()

        english_verses = english_passage_api.retrieve_passage(
            passage)
        chinese_verses = chinese_passage_api.retrieve_passage(
            passage)

        combined_verses = combine_chi_eng_verses(
            chinese_verses, english_verses)

        verses_len = len(combined_verses)

        range_limit = verses_len if verses_len % 2 == 0 else verses_len - 1
        for i in range(0, range_limit, 2):
            slide_contexts.append({
                'title': 'responsive',
                'data': {
                    'chi_open': "".join(combined_verses[i]['chi']),
                    'eng_open': "".join(combined_verses[i]['eng']),
                    'chi_close': "".join(combined_verses[i+1]['chi']),
                    'eng_close': "".join(combined_verses[i+1]['eng']),
                    'title': ''
                }
            })
        return slide_contexts

    # TODO: reduces amount of API calls
    def responsive_end(self):
        passage = self.get_passages()[0]
        english_passage_api = KjvPassageApi()
        chinese_passage_api = CuvsPassageApi()

        english_verses = english_passage_api.retrieve_passage(
            passage)
        chinese_verses = chinese_passage_api.retrieve_passage(
            passage)
        combined_verses = combine_chi_eng_verses(
            chinese_verses, english_verses)
        last_index = len(combined_verses) - 1

        return {
            'title': 'responsive_end',
            'data': {
                'chi_close': "".join(combined_verses[last_index]['chi']),
                'eng_close': "".join(combined_verses[last_index]['eng']),
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


def combine_chi_eng_verses(chi_verses: list, eng_verses: list):
    verses = []
    while len(eng_verses) > 0:
        if int(eng_verses[0][0]) == chi_verses[0][0]:
            eng_verse = eng_verses.pop(0)
            chi_verse = chi_verses.pop(0)
            verses.append({
                'num': eng_verse[0],
                'eng': [eng_verse[1]],
                'chi': [chi_verse[1]],
            })
        # if one verse its number is smaller, append it to the last in the verses
        elif int(eng_verses[0][0]) < chi_verses[0][0]:
            verses[-1]['eng'].append(eng_verses.pop(0)[1])
        elif int(eng_verses[0][0]) > chi_verses[0][0]:
            verses[-1]['chi'].append(chi_verses.pop(0)[1])
    return verses


# passages = [Passage(book=BibleBook.proverbs, start_verse=Verse(
#     chapter=16, verse=1), end_verse=Verse(chapter=16, verse=8))]
# slide = ResponsivePresentationBuilder(
#     base_name="template/base_wide.pptx", passages=passages)
# slide.build()
# slide.save_file()
