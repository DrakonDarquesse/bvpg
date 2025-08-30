from typing import TypedDict


Document = TypedDict('document', {
    'book': str,
    'bookNum': int, 
    'chapter': int,
    'verse': int,
    'data': str
})
