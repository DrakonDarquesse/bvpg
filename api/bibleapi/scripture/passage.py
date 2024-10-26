

from typing import cast
import requests

from bibleapi.scripture.bibleid import BibleID
from bibleapi.scripture.passageparam import PassageParam


def get_passage(api_key: str, bible_id: BibleID, passage, params: PassageParam):
    try:
        r = requests.get(
            url=f'https://api.scripture.api.bible/v1/bibles/{bible_id.value}/passages/{passage}',
            headers={
                'api-key': api_key,
                'accept': 'application/json'
            },
            params=cast(dict, params)
        )

        r.raise_for_status()
        return r.json()
    except requests.exceptions.HTTPError as err:
        print('HTTP Error:', err)
    except requests.exceptions.ConnectionError as err:
        print('Connection Error:', err)
    except requests.exceptions.Timeout as err:
        print('Timeout Error:', err)
    except requests.exceptions as err:
        print('Something went wrong', err)

    return {'status':  r.status_code, 'err': r.reason}
