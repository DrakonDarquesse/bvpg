

from bibleapi.scripture.passage import get_passage
from bibleapi.scripture.bibleid import BibleID
from bibleapi.scripture.contenttype import ContentType


def get_passage_content(api_key: str, bible_id: BibleID, passage: str):
    res_json = get_passage(
        api_key,
        bible_id=bible_id,
        passage=passage,
        params={
            'content-type': 'text',
            'include-titles': False,
            'include-verse-numbers': True
        }
    )

    if 'err' in res_json:
        print(res_json['err'])
        return ''

    try:
        return res_json['data']['content']
    except KeyError:
        print('content not found')
        return ''
