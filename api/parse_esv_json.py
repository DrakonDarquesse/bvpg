import json
import re
from typing import Optional

from mongodb import UploadMixin


class ESVJSONParser:

    def __init__(self, file_path, uploader: UploadMixin):
        self.json_file = file_path
        self.raw_data: Optional[dict] = None
        self.books: dict[str, list[list[str]]] = {}
        self.uploader = uploader

    def open_file(self, file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
            return data

    def get_books(self, bible_json):
        return bible_json["books"]

    def get_book_by_name_from_raw_json(self, book_name):
        if book_name == "" or book_name == None:
            raise Exception("book name cannot be empty")
        
        if self.raw_data == None:
            raise Exception("data not loaded")
        
        return self.raw_data[book_name]

    def load_data(self):
        json = self.open_file(self.json_file)
        self.raw_data = self.get_books(json)

    def extract_scriptures(self):
        for book, chapters in self.raw_data.items():
            book_chapters = []
            for chapter in chapters:
                chapter_verses = self.concatenate_verse_list(chapter)
                book_chapters.append(chapter_verses)
            self.books.update({
                book: book_chapters
            })

    def concatenate_verse_list(self, chapter: list):

        # from the json, the first item of the list is verse bits, the rest are metadata
        verses = []
        for verse in chapter:
            joined_verse_bits = " ".join([verse_bit[0] for verse_bit in verse if isinstance(verse_bit[0], str)]) 

            # remove spaces before punctuation
            verse_string = re.sub(r'\s([?.,;!"](?:\s|$))', r'\1', joined_verse_bits)
            verses.append(verse_string)
        
        return verses
    
    def get_book_by_name(self, book_name):
        if book_name == "" or book_name == None:
            raise Exception("book name cannot be empty")
        
        return self.books[book_name]
    
    def organise_scriptures_into_documents(self):
        document_data: list[Document]  = []
        book_index = 1
        for book, chapters in self.books.items():
            chapter_index = 1
            for chapter in chapters:
                verse_index = 1
                for verse in chapter:
                    document: Document = {
                        'book': book,
                        'bookNum': book_index,
                        'chapter': chapter_index,
                        'verse': verse_index,
                        'data': verse
                    } 
                    document_data.append(document)
                    verse_index += 1
                chapter_index += 1
            book_index += 1
        return document_data
    
    def upload_bible_to_database(self, database: str, collection_name: str):
        try: 
            data = self.organise_scriptures_into_documents()
            print(len(data))
            self.uploader.upload_data(database, collection_name, data)
        except Exception as e:
            print("something went wrong", e)
            
