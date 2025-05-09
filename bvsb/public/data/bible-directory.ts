const bibleDirectory = [
  {
    bookName: "Genesis",
    bookIndex: 1,
    chapters: [
      31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33,
      38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43,
      36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
    ],
  },
  {
    bookName: "Exodus",
    bookIndex: 2,
    chapters: [
      22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27,
      25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38,
      29, 31, 43, 38,
    ],
  },
  {
    bookName: "Leviticus",
    bookIndex: 3,
    chapters: [
      17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37,
      27, 24, 33, 44, 23, 55, 46, 34,
    ],
  },
  {
    bookName: "Numbers",
    bookIndex: 4,
    chapters: [
      54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32,
      22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13,
    ],
  },
  {
    bookName: "Deuteronomy",
    bookIndex: 5,
    chapters: [
      46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22,
      21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12,
    ],
  },
  {
    bookName: "Joshua",
    bookIndex: 6,
    chapters: [
      18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28,
      51, 9, 45, 34, 16, 33,
    ],
  },
  {
    bookName: "Judges",
    bookIndex: 7,
    chapters: [
      36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31,
      30, 48, 25,
    ],
  },
  {
    bookName: "Ruth",
    bookIndex: 8,
    chapters: [22, 23, 18, 22],
  },
  {
    bookName: "1 Samuel",
    bookIndex: 9,
    chapters: [
      28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30,
      24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13,
    ],
  },
  {
    bookName: "2 Samuel",
    bookIndex: 10,
    chapters: [
      27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33,
      43, 26, 22, 51, 39, 25,
    ],
  },
  {
    bookName: "1 Kings",
    bookIndex: 11,
    chapters: [
      53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46,
      21, 43, 29, 53,
    ],
  },
  {
    bookName: "2 Kings",
    bookIndex: 12,
    chapters: [
      18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37,
      37, 21, 26, 20, 37, 20, 30,
    ],
  },
  {
    bookName: "1 Chronicles",
    bookIndex: 13,
    chapters: [
      54, 55, 24, 42, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 42, 27, 17,
      19, 8, 30, 19, 31, 31, 31, 32, 34, 21, 30,
    ],
  },
  {
    bookName: "2 Chronicles",
    bookIndex: 14,
    chapters: [
      17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34,
      11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23,
    ],
  },
  {
    bookName: "Ezra",
    bookIndex: 15,
    chapters: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
  },
  {
    bookName: "Nehemiah",
    bookIndex: 16,
    chapters: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
  },
  {
    bookName: "Esther",
    bookIndex: 17,
    chapters: [22, 23, 15, 17, 14, 14, 10, 16, 31, 3],
  },
  {
    bookName: "Job",
    bookIndex: 18,
    chapters: [
      22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21,
      29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24,
      41, 30, 24, 34, 17,
    ],
  },
  {
    bookName: "Psalms",
    bookIndex: 19,
    chapters: [
      5, 12, 8, 8, 12, 10, 17, 7, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13,
      31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17,
      13, 11, 5, 25, 17, 11, 9, 14, 18, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12,
      8, 12, 10, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 11, 20, 72, 13,
      19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9,
      5, 8, 28, 22, 35, 44, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 18, 2, 29, 176,
      7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 20, 25, 9, 8, 24, 13, 10, 7,
      12, 15, 21, 10, 20, 14, 9, 6,
    ],
  },
  {
    bookName: "Proverbs",
    bookIndex: 20,
    chapters: [
      32, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24,
      29, 30, 31, 29, 34, 34, 28, 27, 27, 28, 27, 33, 31,
    ],
  },
  {
    bookName: "Ecclesiastes",
    bookIndex: 21,
    chapters: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
  },
  {
    bookName: "Song of Songs",
    bookIndex: 22,
    chapters: [17, 17, 11, 16, 16, 13, 13, 14],
  },
  {
    bookName: "Isaiah",
    bookIndex: 23,
    chapters: [
      31, 22, 26, 5, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
      17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8,
      31, 29, 25, 27, 28, 25, 13, 15, 21, 26, 11, 23, 15, 12, 17, 13, 12, 21,
      14, 21, 22, 11, 12, 19, 12, 24, 24,
    ],
  },
  {
    bookName: "Jeremiah",
    bookIndex: 24,
    chapters: [
      19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23,
      15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 21, 19, 32,
      21, 28, 18, 16, 18, 22, 12, 30, 5, 28, 7, 47, 39, 46, 64, 34,
    ],
  },
  {
    bookName: "Lamentations",
    bookIndex: 25,
    chapters: [22, 22, 66, 22, 22],
  },
  {
    bookName: "Ezekiel",
    bookIndex: 26,
    chapters: [
      28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 31, 14,
      49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28,
      23, 28, 49, 25, 20, 27, 31, 25, 24, 23, 35,
    ],
  },
  {
    bookName: "Daniel",
    bookIndex: 27,
    chapters: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
  },
  {
    bookName: "Hosea",
    bookIndex: 28,
    chapters: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
  },
  {
    bookName: "Joel",
    bookIndex: 29,
    chapters: [20, 32, 21],
  },
  {
    bookName: "Amos",
    bookIndex: 30,
    chapters: [15, 16, 15, 13, 27, 14, 17, 14, 15],
  },
  {
    bookName: "Obadiah",
    bookIndex: 31,
    chapters: [21],
  },
  {
    bookName: "Jonah",
    bookIndex: 32,
    chapters: [17, 10, 10, 11],
  },
  {
    bookName: "Micah",
    bookIndex: 33,
    chapters: [16, 13, 12, 13, 15, 16, 20],
  },
  {
    bookName: "Nahum",
    bookIndex: 34,
    chapters: [15, 13, 19],
  },
  {
    bookName: "Habakkuk",
    bookIndex: 35,
    chapters: [17, 20, 19],
  },
  {
    bookName: "Zephaniah",
    bookIndex: 36,
    chapters: [18, 14, 20],
  },
  {
    bookName: "Haggai",
    bookIndex: 37,
    chapters: [15, 23],
  },
  {
    bookName: "Zechariah",
    bookIndex: 38,
    chapters: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
  },
  {
    bookName: "Malachi",
    bookIndex: 39,
    chapters: [14, 17, 18, 6],
  },
  {
    bookName: "Matthew",
    bookIndex: 40,
    chapters: [
      25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 26, 34,
      29, 34, 46, 46, 38, 51, 46, 75, 66, 20,
    ],
  },
  {
    bookName: "Mark",
    bookIndex: 41,
    chapters: [45, 28, 34, 41, 43, 56, 36, 38, 48, 52, 32, 43, 37, 72, 46, 20],
  },
  {
    bookName: "Luke",
    bookIndex: 42,
    chapters: [
      77, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 36, 43,
      48, 47, 38, 71, 55, 53,
    ],
  },
  {
    bookName: "John",
    bookIndex: 43,
    chapters: [
      51, 25, 36, 54, 46, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40,
      42, 31, 25,
    ],
  },
  {
    bookName: "Acts",
    bookIndex: 44,
    chapters: [
      25, 47, 26, 37, 42, 15, 60, 39, 43, 47, 30, 25, 52, 28, 39, 40, 34, 28,
      41, 38, 40, 30, 35, 26, 27, 32, 44, 30,
    ],
  },
  {
    bookName: "Romans",
    bookIndex: 45,
    chapters: [31, 29, 30, 24, 21, 23, 25, 38, 33, 21, 36, 21, 14, 23, 32, 26],
  },
  {
    bookName: "1 Corinthians",
    bookIndex: 46,
    chapters: [31, 16, 23, 21, 12, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24],
  },
  {
    bookName: "2 Corinthians",
    bookIndex: 47,
    chapters: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 13],
  },
  {
    bookName: "Galatians",
    bookIndex: 48,
    chapters: [23, 21, 29, 31, 26, 18],
  },
  {
    bookName: "Ephesians",
    bookIndex: 49,
    chapters: [23, 22, 20, 32, 33, 23],
  },
  {
    bookName: "Philippians",
    bookIndex: 50,
    chapters: [30, 30, 21, 23],
  },
  {
    bookName: "Colossians",
    bookIndex: 51,
    chapters: [29, 22, 25, 18],
  },
  {
    bookName: "1 Thessalonians",
    bookIndex: 52,
    chapters: [10, 19, 13, 18, 28],
  },
  {
    bookName: "2 Thessalonians",
    bookIndex: 53,
    chapters: [11, 17, 18],
  },
  {
    bookName: "1 Timothy",
    bookIndex: 54,
    chapters: [20, 15, 16, 16, 25, 21],
  },
  {
    bookName: "2 Timothy",
    bookIndex: 55,
    chapters: [18, 26, 17, 22],
  },
  {
    bookName: "Titus",
    bookIndex: 56,
    chapters: [16, 15, 15],
  },
  {
    bookName: "Philemon",
    bookIndex: 57,
    chapters: [25],
  },
  {
    bookName: "Hebrews",
    bookIndex: 58,
    chapters: [14, 18, 19, 16, 14, 18, 28, 13, 28, 39, 40, 29, 25],
  },
  {
    bookName: "James",
    bookIndex: 59,
    chapters: [27, 26, 18, 17, 20],
  },
  {
    bookName: "1 Peter",
    bookIndex: 60,
    chapters: [25, 25, 22, 19, 14],
  },
  {
    bookName: "2 Peter",
    bookIndex: 61,
    chapters: [21, 22, 18],
  },
  {
    bookName: "1 John",
    bookIndex: 62,
    chapters: [10, 29, 24, 21, 21],
  },
  {
    bookName: "2 John",
    bookIndex: 63,
    chapters: [13],
  },
  {
    bookName: "3 John",
    bookIndex: 64,
    chapters: [15],
  },
  {
    bookName: "Jude",
    bookIndex: 65,
    chapters: [25],
  },
  {
    bookName: "Revelation",
    bookIndex: 66,
    chapters: [
      19, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 18, 18, 20, 8, 21, 18, 24, 21,
      15, 27, 21,
    ],
  },
] as const;

type BibleDirectory = typeof bibleDirectory;

const book = (bookIndex: number) =>
  bibleDirectory.find((val) => val.bookIndex == bookIndex);

const chapters = (bookIndex: number) =>
  Array.from(Array(book(bookIndex)?.chapters.length), (_, i) => i + 1);

const verses = (bookIndex: number, chapterIndex: number) =>
  Array.from(
    Array(book(bookIndex)?.chapters[chapterIndex - 1]),
    (_, i) => i + 1
  );

export default bibleDirectory;

export { book, chapters, verses };

export { type BibleDirectory };
