const bibleDirectory = [
  {
    bookName: "genesis",
    bookIndex: 1,
    chapters: [
      {
        chapterNum: 1,
        numOfVerse: 20,
      },
      {
        chapterNum: 2,
        numOfVerse: 20,
      },
    ],
  },
] as const;

type BibleDirectory = typeof bibleDirectory;

export default bibleDirectory;

export { type BibleDirectory };
