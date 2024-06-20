from pptx import Presentation
from data.bible import BibleBookVerbose
from base import ContextMixin, PresentationBuilder, PresentationTemplateMixin, duplicate_slide, render_slide_data
from bible_passage_api import CuvsPassageApi, KjvPassageApi
from models import BibleBook, Passage, Verse
from environment import env


def format_overline(passage: Passage):
    '''
    Format the overline to be in the format of [book] [chapter]:[start_verse]-[end_verse] or etc
    '''
    book = BibleBookVerbose[passage.book.name].value
    if passage.start_verse.chapter == passage.end_verse.chapter:
        return f'{book} {passage.start_verse.chapter}:{passage.start_verse.verse}-{passage.end_verse.verse}'
    else:
        return f'{book} {passage.start_verse.chapter}:{passage.start_verse.verse}-{passage.end_verse.chapter}:{passage.end_verse.verse}'


class PassageContext(ContextMixin):
    passages: list[Passage] = []

    def get_context(self):
        return [self.cover(), *self.verse()]

    def get_passages(self):
        return self.passages

    def cover(self):
        passages = self.get_passages()
        if len(passages) > 1:
            pass
        else:
            passage = passages[0]
            context = {
                'title': 'one_passage_cover',
                'data': {
                    'title': '读经',
                    'chi_book': BibleBookVerbose[passage.book.name].value,
                    'eng_book': passage.book.name,
                }
            }
            if passage.is_same_chapter():
                context['data'].update({
                    'verse': f'{passage.start_verse.chapter}: {passage.start_verse.verse}-{passage.end_verse.verse}'
                })
            else:
                context['data'].update({
                    'verse': f'{passage.start_verse.chapter}: {passage.start_verse.verse}-{passage.end_verse.chapter}: {passage.end_verse.verse}'
                })
            return context

    def verse(self):
        slide_contexts = []
        passages = self.get_passages()
        for passage in passages:
            english_passage_api = KjvPassageApi()
            chinese_passage_api = CuvsPassageApi()

            english_verses = english_passage_api.retrieve_passage(
                passage)
            chinese_verses = chinese_passage_api.retrieve_passage(
                passage)
            overline = format_overline(passage=passage)

            combined_verses = combine_chi_eng_verses(
                [], chinese_verses, english_verses)

            for verse in combined_verses:
                print(verse['num'])
                slide_contexts.append({
                    'title': 'verse',
                    'data': {
                        'title': overline,
                        'verse_num': verse['num'],
                        'chi_verse': "".join(verse['chi']),
                        'eng_verse': "".join(verse['eng'])
                    }
                })

        return slide_contexts


class PassagePresentationBuilder(PresentationBuilder, PresentationTemplateMixin, PassageContext):
    template = Presentation("template/passage_template.pptx")

    def __init__(self, save_file_name: str = 'slide.pptx', base_name: str | None = None, passages: list[Passage] = []) -> None:
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
        template_slide = self.get_slide(context["title"])
        new_slide = self.new_slide()

        duplicate_slide(template_slide, new_slide)
        render_slide_data(new_slide, context, env)


# passages = [Passage(book=BibleBook.ruth, start_verse=Verse(
#     chapter=1, verse=1), end_verse=Verse(chapter=1, verse=17))]
# slide = PassagePresentationBuilder(
#     base_name="template/base_wide.pptx", passages=passages)
# slide.build()
# slide.save_file()


def combine_chi_eng_verses(verses: list[dict], chi_verses: list, eng_verses: list):
    # if one verse its number is smaller, append it to the last in the verses
    if int(eng_verses[0][0]) < chi_verses[0][0]:
        verses[-1]['eng'].append(eng_verses.pop(0)[1])
    elif int(eng_verses[0][0]) == chi_verses[0][0]:
        eng_verse = eng_verses.pop(0)
        chi_verse = chi_verses.pop(0)
        verses.append({
            'num': eng_verse[0],
            'eng': [eng_verse[1]],
            'chi': [chi_verse[1]],
        })
    if len(eng_verses) > 0:
        verses = combine_chi_eng_verses(verses, chi_verses, eng_verses)

    return verses
