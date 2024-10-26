from enum import Enum
from decouple import config
import re
import sqlite3
from typing import Callable
from pydantic_core import Url
import requests
from data.bible import BibleBook
from models import Passage


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
    return int(chapter_verse.split(".")[1])


class BiblePassageApi:

    error_handler: Callable | None = None

    def get_api(self, passage: Passage) -> Url:
        raise NotImplementedError("Should have implemented this")

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        raise NotImplementedError("Should have implemented this")


class KjvPassageApi(BiblePassageApi):
    bible = 'de4e12af7f28f599-01'
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

    class BookCode(int, Enum):
        GEN = BibleBook.genesis
        EXO = BibleBook.exodus
        RUT = BibleBook.ruth
        PRO = BibleBook.proverbs
        ROM = BibleBook.romans
        JHN = BibleBook.john
        MRK = BibleBook.mark
        EPH = BibleBook.ephesians
        JON = BibleBook.jonah
        ESG = BibleBook.esther

    def get_param(self, passage: Passage):
        book = self.BookCode(passage.book).name
        return f'{book}.{passage.start_verse.chapter}.{passage.start_verse.verse}-{book}.{passage.end_verse.chapter}.{passage.end_verse.verse}'

    def get_api(self, passage: Passage, *args, **kwargs) -> Url:
        bible = self.bible
        passage_param = self.get_param(passage)
        return Url(f'https://api.scripture.api.bible/v1/bibles/{bible}/passages/{passage_param}')

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        url = self.get_api(passage=passage)
        try:
            r = requests.get(url.unicode_string(), headers={
                'api-key': self.api_key, 'accept': 'application/json'}, params={'content-type': 'text', 'include-titles': 'false', 'include-verse-numbers': 'true'})
            r.raise_for_status()
            content = r.json().get('data').get('content')
            return match_number_and_verse_pair(content)
        except requests.exceptions.HTTPError as err:
            print('HTTP Error:', err)
        except requests.exceptions.ConnectionError as err:
            print('Connection Error:', err)
        except requests.exceptions.Timeout as err:
            print('Timeout Error:', err)

        return []


class CuvsPassageApi(BiblePassageApi):

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        start_verse = passage.start_verse.chapter + passage.start_verse.verse / 1000
        end_verse = passage.end_verse.chapter + passage.end_verse.verse / 1000
        try:
            # Connect to DB and create a cursor
            sqliteConnection = sqlite3.connect('rcuvss.sqlite3')
            cursor = sqliteConnection.cursor()
            print('DB Init')

            # Write a query and execute it with cursor
            query = \
                f'''
                    WITH book AS
                    (SELECT v.id, v.verse, v.unformatted FROM verses v
                    JOIN books b ON v.book = b.osis
                    WHERE b.number = {passage.book.value})

                    SELECT v.verse, v.unformatted FROM verses v
                    WHERE v.id BETWEEN
                    (
                        SELECT id FROM book WHERE verse = {start_verse}

                    ) AND
                    (
                        SELECT id FROM book WHERE verse = {end_verse}
                    );
                '''
            cursor.execute(query)

            # Fetch and output result
            result = cursor.fetchall()

            # Close the cursor
            cursor.close()

            return list(map(lambda x: (get_verse(x[0]), x[1]), result))

        # Handle errors
        except sqlite3.Error as error:
            print('Error occurred - ', error)

        # Close DB Connection irrespective of success
        # or failure
        finally:

            if sqliteConnection:
                sqliteConnection.close()
                print('SQLite Connection closed')

        return []


class PassageList:

    english_passage_api = KjvPassageApi()
    chinese_passage_api = CuvsPassageApi()

    def __init__(self, passage: Passage) -> None:

        eng_verses = self.english_passage_api.retrieve_passage(
            passage)
        chi_verses = self.chinese_passage_api.retrieve_passage(
            passage)

        while len(eng_verses) > 0:
            if int(eng_verses[0][0]) == chi_verses[0][0]:
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
