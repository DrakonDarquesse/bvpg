from data.bible import BibleBookVerbose
from base import Context
from bible_passage_api import PassageList
from models import Passage


class ResponsiveContext(Context):
    def __init__(self, passages: list[Passage]) -> None:
        self.passages = passages
        self.combined_verses = []

    def get_context(self):
        passage = self.passages[0]
        self.combined_verses = PassageList(passage=passage).passages
        return [self.cover(), *self.responsive(), self.responsive_end()]

    def cover(self):
        passage = self.passages[0]
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
