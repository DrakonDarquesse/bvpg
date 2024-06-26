"use client";

import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import BasicSelect from "./basic-select";
import bibleDirectory, {
  type BibleDirectory,
} from "../../../public/data/bible-directory";

// ? add id because the parent component need to identify
type Passage = {
  book: number | undefined;
  chapter: number | undefined;
  startVerse: number | undefined;
  endVerse: number | undefined;
};

const PassageForm = (props: {
  passage: Passage | undefined;
  onSave: (passage: Passage) => void;
}) => {
  const [passage, setPassage] = React.useState<Passage>(
    props.passage
      ? props.passage
      : {
          book: undefined,
          chapter: undefined,
          startVerse: undefined,
          endVerse: undefined,
        }
  );

  const handleSubmit = (next: (passage: Passage) => void) => {
    if (
      passage.book &&
      passage.chapter &&
      passage.endVerse &&
      passage.startVerse
    ) {
      next(passage);
    }
  };

  const handleBookChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setPassage(() => ({
      book: value,
      chapter: undefined,
      startVerse: undefined,
      endVerse: undefined,
    }));
  };

  const handleChapterChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setPassage((passage) => ({
      ...passage,
      chapter: value,
      startVerse: undefined,
      endVerse: undefined,
    }));
  };

  const handleStartVerseChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setPassage((passage) => ({
      ...passage,
      startVerse: value,
      endVerse:
        passage.endVerse && passage.endVerse < value ? value : passage.endVerse,
      // end verse must be at least same or more than startVerse, or its undefined
    }));
  };

  const handleEndVerseChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    setPassage((passage) => ({
      ...passage,
      endVerse: value,
    }));
  };

  // ! get books from directory
  const books = [
    { value: 1, label: "Genesis" },
    { value: 2, label: "Exodus" },
  ];

  const getChapterOptions = React.useMemo(() => {
    return (book: keyof BibleDirectory | undefined) =>
      !book
        ? []
        : bibleDirectory[book].map((chapter) => ({
            value: chapter.chapterNum,
            label: chapter.chapterNum,
          }));
  }, []);

  const getStartVerseOptions = React.useMemo(() => {
    return (passage: Passage) =>
      !passage.book || !passage.chapter
        ? []
        : Array.from(
            Array(
              bibleDirectory["exodus"][passage.chapter - 1].numOfVerse
            ).keys()
          ).map((num) => num + 1);
  }, []);

  const getEndVerseOptions = React.useMemo(() => {
    return (passage: Passage) =>
      !passage.book || !passage.chapter
        ? []
        : // ? split this part as its individual function because got duplicate?
          Array.from(
            Array(
              bibleDirectory["genesis"][passage.chapter - 1].numOfVerse
            ).keys()
          )
            .toSpliced(0, passage.startVerse ? passage.startVerse - 1 : 0)
            .map((num) => num + 1);
  }, []);

  return (
    <>
      <BasicSelect
        value={passage.book}
        label="Book"
        name="book"
        options={books}
        onChange={handleBookChange}
      ></BasicSelect>
      <BasicSelect
        value={passage.chapter}
        label="Chapter"
        name="chapter"
        options={getChapterOptions("exodus")}
        onChange={handleChapterChange}
      ></BasicSelect>
      <BasicSelect
        value={passage.startVerse}
        label="Starting Verse"
        name="startVerse"
        options={getStartVerseOptions(passage)}
        onChange={handleStartVerseChange}
      ></BasicSelect>
      <BasicSelect
        value={passage.endVerse}
        label="Ending Verse"
        options={getEndVerseOptions(passage)}
        name="endVerse"
        onChange={handleEndVerseChange}
      ></BasicSelect>
      <Button onClick={() => handleSubmit(props.onSave)}>Save</Button>
    </>
  );
};

export default PassageForm;

export { type Passage };
