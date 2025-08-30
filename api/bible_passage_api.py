from decouple import config
import re

from bibleapi.scripture.bibleid import BibleID
from utils import get_passage_content
from data.bible import BibleBook
from models import Passage, Verse
from mongodb import mongodb_session


def match_number_and_verse_pair(passage):
    '''
    Match the entire pattern of bracket number follow by text
    '''
    verses = re.findall(r'\[(\d+)\](.*?)(?=\[|$)', passage, re.DOTALL)
    # Filter out empty strings and whitespace
    verses = [(verse[0], verse[1].strip())
              for verse in verses if verse[1].strip()]
    return verses


def split_verse_and_match_number(passage):
    '''
    Split the passage using verse numbers as delimiter
    and match the verse number with the verse text
    '''

    # Find all verse numbers in the passage
    pattern = r'(?<=\[)\d+(?=\])'
    verse_numbers = [number for number in re.findall(pattern, passage)]

    # Split the text by bracket numbers
    verses = re.split(r'\[\d+\]', passage)

    # Filter out empty strings and whitespace
    verses = [string.strip() for string in verses if string.strip()]

    if len(verses) != len(verse_numbers):
        print('Verse numbers and verses do not match')

    return list(zip(verse_numbers, verses))


def get_verse(chapter_verse: str):
    # return int(chapter_verse.split(".")[1])
    return int(round(float(chapter_verse) * 1000 % 1000))


class BiblePassageApi:

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        raise NotImplementedError("Should have implemented this")


class KjvPassageApi(BiblePassageApi):

    # todo: just pass bible_id at initialization

    api_key: str = config("API_KEY")  # type: ignore

    book_code = {
        BibleBook.genesis: 'GEN',
        BibleBook.exodus: 'EXO',
        BibleBook.leviticus: 'LEV',
        BibleBook.numbers: 'NUM',
        BibleBook.deuteronomy: 'DEU',
        BibleBook.joshua: 'JOS',
        BibleBook.judges: 'JDG',
        BibleBook.ruth: 'RUT',
        BibleBook.samuel_1: '1SA',
        BibleBook.samuel_2: '2SA',
        BibleBook.kings_1: '1KI',
        BibleBook.kings_2: '2KI',
        BibleBook.chronicles_1: '1CH',
        BibleBook.chronicles_2: '2CH',
        BibleBook.ezra: 'EZR',
        BibleBook.nehemiah: 'NEH',
        BibleBook.esther: 'EST',
        BibleBook.job: 'JOB',
        BibleBook.psalms: 'PSA',
        BibleBook.proverbs: 'PRO',
        BibleBook.ecclesiastes: 'ECC',
        BibleBook.song_of_songs: 'SNG',
        BibleBook.isaiah: 'ISA',
        BibleBook.jeremiah: 'JER',
        BibleBook.lamentations: 'LAM',
        BibleBook.ezekiel: 'EZK',
        BibleBook.daniel: 'DAN',
        BibleBook.hosea: 'HOS',
        BibleBook.joel: 'JOL',
        BibleBook.amos: 'AMO',
        BibleBook.obadiah: 'OBA',
        BibleBook.jonah: 'JON',
        BibleBook.micah: 'MIC',
        BibleBook.nahum: 'NAM',
        BibleBook.habakkuk: 'HAB',
        BibleBook.zephaniah: 'ZEP',
        BibleBook.haggai: 'HAG',
        BibleBook.zechariah: 'ZEC',
        BibleBook.malachi: 'MAL',
        BibleBook.matthew: 'MAt',
        BibleBook.mark: 'MRK',
        BibleBook.luke: 'LUK',
        BibleBook.john: 'JHN',
        BibleBook.acts: 'ACT',
        BibleBook.romans: 'ROM',
        BibleBook.corinthians_1: '1CO',
        BibleBook.corinthians_2: '2CO',
        BibleBook.galatians: 'GAL',
        BibleBook.ephesians: 'EPH',
        BibleBook.philippians: 'PHP',
        BibleBook.colossians: 'COL',
        BibleBook.thessalonians_1: '1TH',
        BibleBook.thessalonians_2: '2TH',
        BibleBook.timothy_1: '1TI',
        BibleBook.timothy_2: '2TI',
        BibleBook.titus: 'TIT',
        BibleBook.philemon: 'PHM',
        BibleBook.hebrews: 'HEB',
        BibleBook.james: 'JAS',
        BibleBook.peter_1: '1PE',
        BibleBook.peter_2: '2PE',
        BibleBook.john_1: '1JN',
        BibleBook.john_2: '2JN',
        BibleBook.john_3: '3JN',
        BibleBook.jude: 'JUD',
        BibleBook.revelation: 'REV',
    }

    def format_passage_param(self, passage: Passage):
        book = self.book_code.get(passage.book)
        return f'{book}.{passage.start_verse.chapter}.{passage.start_verse.verse}-{book}.{passage.end_verse.chapter}.{passage.end_verse.verse}'

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        content = get_passage_content(
            self.api_key,
            bible_id=BibleID.KJV,
            passage=self.format_passage_param(passage)
        )
        return match_number_and_verse_pair(content)


class CuvsPassageApi(BiblePassageApi):

    book_code = {
        BibleBook.genesis: 'Gen',
        BibleBook.exodus: 'Exod',
        BibleBook.leviticus: 'Lev',
        BibleBook.numbers: 'Num',
        BibleBook.deuteronomy: 'Deut',
        BibleBook.joshua: 'Josh',
        BibleBook.judges: 'Judg',
        BibleBook.ruth: 'Ruth',
        BibleBook.samuel_1: '1Sam',
        BibleBook.samuel_2: '2Sam',
        BibleBook.kings_1: '1Kgs',
        BibleBook.kings_2: '2Kgs',
        BibleBook.chronicles_1: '1Chr',
        BibleBook.chronicles_2: '2Chr',
        BibleBook.ezra: 'Ezra',
        BibleBook.nehemiah: 'Neh',
        BibleBook.esther: 'Esth',
        BibleBook.job: 'Job',
        BibleBook.psalms: 'Ps',
        BibleBook.proverbs: 'Prov',
        BibleBook.ecclesiastes: 'Eccl',
        BibleBook.song_of_songs: 'Song',
        BibleBook.isaiah: 'Isa',
        BibleBook.jeremiah: 'Jer',
        BibleBook.lamentations: 'Lam',
        BibleBook.ezekiel: 'Ezek',
        BibleBook.daniel: 'Dan',
        BibleBook.hosea: 'Hos',
        BibleBook.joel: 'Joel',
        BibleBook.amos: 'Amos',
        BibleBook.obadiah: 'Obad',
        BibleBook.jonah: 'Jonah',
        BibleBook.micah: 'Mic',
        BibleBook.nahum: 'Nah',
        BibleBook.habakkuk: 'Hab',
        BibleBook.zephaniah: 'Zeph',
        BibleBook.haggai: 'Hag',
        BibleBook.zechariah: 'Zech',
        BibleBook.malachi: 'Mal',
        BibleBook.matthew: 'Matt',
        BibleBook.mark: 'Mark',
        BibleBook.luke: 'Luke',
        BibleBook.john: 'John',
        BibleBook.acts: 'Acts',
        BibleBook.romans: 'Rom',
        BibleBook.corinthians_1: '1Cor',
        BibleBook.corinthians_2: '2Cor',
        BibleBook.galatians: 'Gal',
        BibleBook.ephesians: 'Eph',
        BibleBook.philippians: 'Phil',
        BibleBook.colossians: 'Col',
        BibleBook.thessalonians_1: '1Thess',
        BibleBook.thessalonians_2: '2Thess',
        BibleBook.timothy_1: '1Tim',
        BibleBook.timothy_2: '2Tim',
        BibleBook.titus: 'Titus',
        BibleBook.philemon: 'Phlm',
        BibleBook.hebrews: 'Heb',
        BibleBook.james: 'Jas',
        BibleBook.peter_1: '1Pet',
        BibleBook.peter_2: '2Pet',
        BibleBook.john_1: '1John',
        BibleBook.john_2: '2John',
        BibleBook.john_3: '3John',
        BibleBook.jude: 'Jude',
        BibleBook.revelation: 'Rev',
    }

    collection = mongodb_session.get_collection("rcuvss", "verses")

    def stringify_verse(self, verse: Verse):
        return str(verse.chapter + verse.verse / 1000)

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        start_verse = self.stringify_verse(passage.start_verse)
        end_verse = self.stringify_verse(passage.end_verse)
        book_code = self.book_code[passage.book]

        try:
            # get the IDs of the starting and ending verse by filtering book and verse
            # regex is used on the book field because the values stored contain whitespaces
            start_verse_doc = self.collection.find_one(
                {
                    'book': {'$regex':  book_code},
                    'verse': start_verse
                }
            )

            if start_verse_doc is None:
                raise Exception(
                    "start verse not found, might be combined with its preceding verse")

            mydoc = self.collection.find(
                {
                    'book': {'$regex': book_code},
                    'verse': {
                        '$gte': start_verse,
                        '$lte': end_verse
                    },
                },
                {
                    'text': 1,
                    'verse': 1,
                }
            ).sort(
                {
                    'verse': 1
                }
            )
            return list(map(lambda x: (get_verse(x['verse']), x['text']), mydoc))
        except Exception as e:
            print(e)
            raise e


class EsvPassageApi(BiblePassageApi):

    collection = mongodb_session.get_collection("esv", "verses")

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        try:
            passage = self.collection.find(
                {
                    'bookNum': passage.book.value,
                    'chapter': passage.start_verse.chapter,
                    'verse': {
                        '$gte': passage.start_verse.verse,
                        '$lte': passage.end_verse.verse
                    },
                },
                {
                    'data': 1,
                    'verse': 1,
                }
            ).sort(
                {
                    'verse': 1
                }
            )
            return list(map(lambda verse: (verse['verse'], verse['data']), passage))
        except Exception as e:
            print(e)
            raise e

class PassageList:

    english_passage_api = EsvPassageApi()
    chinese_passage_api = CuvsPassageApi()

    def __init__(self, passage: Passage) -> None:

        self.passages = []
        eng_verses = self.english_passage_api.retrieve_passage(
            passage)
        chi_verses = self.chinese_passage_api.retrieve_passage(
            passage)

        while len(eng_verses) > 0:
            if len(chi_verses) <= 0:
                self.passages[-1]['eng'].append(eng_verses.pop(0)[1])
            elif int(eng_verses[0][0]) == chi_verses[0][0]:
                eng_verse = eng_verses.pop(0)
                chi_verse = chi_verses.pop(0)
                self.passages.append({
                    'num': eng_verse[0],
                    'eng': [eng_verse[1]],
                    'chi': [chi_verse[1]],
                })
            # if one verse its number is smaller, append it to the last in the verses
            elif int(eng_verses[0][0]) < chi_verses[0][0]:
                self.passages[-1]['eng'].append(eng_verses.pop(0)[1])
            elif int(eng_verses[0][0]) > chi_verses[0][0]:
                self.passages[-1]['chi'].append(chi_verses.pop(0)[1])

    def get(self, lang, num):
        return "".join(self.passages[num][lang])
