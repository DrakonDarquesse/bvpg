from typing import NotRequired, TypedDict

from bibleapi.scripture.contenttype import ContentType

PassageParam = TypedDict(
    'PassageParam', {
        'content-type': NotRequired[ContentType],
        'include-notes': NotRequired[bool],
        'include-titles': NotRequired[bool],
        'include-chapter-numbers': NotRequired[bool],
        'include-verse-numbers': NotRequired[bool],
        'include-verse-spans': NotRequired[bool],
        'parallels': NotRequired[str],
        'use-org-id': NotRequired[bool],
    }
)
