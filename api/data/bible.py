from enum import Enum


class BibleBook(int, Enum):
    genesis = 1
    exodus = 2
    romans = 45
    proverbs = 20
    john = 43
    mark = 41


class BibleBookVerbose(str, Enum):
    genesis = "创世记"
    exodus = "出埃及记"
    proverbs = "箴言"
    romans = "罗马书"
    john = "约翰福音"
    mark = "马可福音"
