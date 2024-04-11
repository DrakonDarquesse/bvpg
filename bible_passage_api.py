from enum import Enum
import re
import sqlite3
from typing import Callable
from pydantic_core import Url
import requests
from main import Passage


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


class BiblePassageApi:

    api: Url | None = None
    error_handler: Callable | None = None

    def get_api(self, passage: Passage) -> Url:
        raise NotImplementedError("Should have implemented this")

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        raise NotImplementedError("Should have implemented this")


class KjvPassageApi(BiblePassageApi):
    bible = 'de4e12af7f28f599-01'

    class BookCode(int, Enum):
        GEN = 1
        EXO = 2

    def get_param(self, passage: Passage):
        book = self.BookCode(passage.book.value).name
        return f'{book}.{passage.start_verse.chapter}.{passage.start_verse.verse}-{book}.{passage.end_verse.chapter}.{passage.end_verse.verse}'

    def get_api(self, passage: Passage, *args, **kwargs) -> Url:
        bible = self.bible
        passage_param = self.get_param(passage)
        return Url(f'https://api.scripture.api.bible/v1/bibles/{bible}/passages/{passage_param}')

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        url = self.get_api(passage=passage)
        r = requests.get(url.unicode_string(), headers={
            'api-key': 'f89e0fc2938f4d054717716279057d45', 'accept': 'application/json'}, params={'content-type': 'text', 'include-titles': 'false', 'include-verse-numbers': 'true'})

        content = r.json().get('data').get('content')
        return match_number_and_verse_pair(content)


class CuvsPassageApi(BiblePassageApi):

    def retrieve_passage(self, passage: Passage, *args, **kwargs):
        try:
            # Connect to DB and create a cursor
            sqliteConnection = sqlite3.connect('bible_cuvs.db')
            cursor = sqliteConnection.cursor()
            print('DB Init')

            # Write a query and execute it with cursor
            query = \
                f'''
                WITH book AS 
                (SELECT bible.ID, Bible.ChapterSN, Bible.VerseSN, Bible.Lection FROM Bible
                JOIN BibleID ON Bible.VolumeSN = BibleID.SN 
                WHERE Bible.VolumeSN = {passage.book.value})

                SELECT Bible.VerseSN, Bible.Lection FROM Bible
                WHERE BIBLE.ID BETWEEN
                (
                    SELECT ID FROM book
                    WHERE ChapterSN = {passage.start_verse.chapter} AND VerseSN = {passage.start_verse.verse}

                ) AND
                (
                    SELECT ID FROM book
                    WHERE ChapterSN = {passage.end_verse.chapter} AND VerseSN = {passage.end_verse.verse}

                );
                '''
            cursor.execute(query)

            # Fetch and output result
            result = cursor.fetchall()

            # Close the cursor
            cursor.close()

            return result

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
