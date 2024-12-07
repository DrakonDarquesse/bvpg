from unittest.mock import patch
from fastapi.testclient import TestClient
from bible_passage_api import get_verse, match_number_and_verse_pair
from main import app
from io import BytesIO
from pptx import Presentation

# Create a TestClient
client = TestClient(app)

# Mock passage data
mock_passages = [
    {
        "book": 1,
        "start_verse": {
            "chapter": 1,
            "verse": 1
        },
        "end_verse":  {
            "chapter": 1,
            "verse": 2
        }
    },
]


@patch("passage_context.PassageList")
def test_build_slide_bible_reading(mock_passage_list):
    instance = mock_passage_list.return_value
    instance.passages = [
        {
            'num': 1,
            'eng': ["eng text"],
            'chi': ["chi text"],
        }
    ]

    # Send a POST request to the endpoint
    response = client.post("/bvpg/slides/bible-reading", json=mock_passages)

    response.raise_for_status()
    # Assert the response status code
    assert response.status_code == 200

    # Assert the response content type
    assert response.headers["content-type"] == "application/pptx"

    # Validate the generated PowerPoint file
    pptx_file = BytesIO(response.content)
    presentation = Presentation(pptx_file)

    # Assert that the presentation has slides
    assert len(presentation.slides) > 0


def test_get_verse():

    test_data = {
        '1.02': 20,
        '1.022': 22,
        '1.005': 5,
        '10.100': 100,
        '5.099': 99
    }

    for input, output in test_data.items():
        verse = get_verse(input)
        assert verse == output


def test_match_number_and_verse_pair():

    data = \
        """
[1] Lorem ipsum
something something
[2] Aaron, said something meow meow!!??
"""

    result = [
        ('1', 'Lorem ipsum\nsomething something'),
        ('2', 'Aaron, said something meow meow!!??')
    ]

    verses = match_number_and_verse_pair(data)

    assert verses == result
