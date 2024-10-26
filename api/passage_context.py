from data.bible import BibleBookVerbose
from base import Context
from bible_passage_api import PassageList
from models import Passage


def format_overline(passage: Passage):
    '''
    Format the overline to be in the format of [book] [chapter]:[start_verse]-[end_verse] or etc
    '''
    book = BibleBookVerbose[passage.book.name].value
    if passage.start_verse.chapter == passage.end_verse.chapter:
        return f'{book} {passage.start_verse.chapter}:{passage.start_verse.verse}-{passage.end_verse.verse}'
    else:
        return f'{book} {passage.start_verse.chapter}:{passage.start_verse.verse}-{passage.end_verse.chapter}:{passage.end_verse.verse}'


class PassageContext(Context):

    def __init__(self, passages: list[Passage]) -> None:
        self.passages = passages
        self.combined_verses = []

    def get_context(self):

        for passage in self.passages:
            self.combined_verses.append(
                {
                    'combined_verses': PassageList(passage=passage).passages,
                    'passage': passage
                })
        return [self.cover(), *self.verse()]

    def cover(self):
        passages = self.passages
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
        for combined_verses in self.combined_verses:
            overline = format_overline(passage=combined_verses['passage'])
            for verse in combined_verses['combined_verses']:
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
