"use client";

import React from "react";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";

import BasicSelect from "./basic-select";
import bibleDirectory, {
  chapters,
  verses,
} from "../../../public/data/bible-directory";
import CustomButton from "./custom-button";

type PassageFormData = {
  book: number | undefined;
  chapter: number | undefined;
  startVerse: number | undefined;
  endVerse: number | undefined;
};

type Passage = {
  book: number;
  chapter: number;
  startVerse: number;
  endVerse: number;
};

function isPassage(passage: PassageFormData | Passage): passage is Passage {
  // if any of the properties is 0, it should be false also, because the value shouldn't be 0
  return Boolean(
    passage.book && passage.chapter && passage.endVerse && passage.startVerse
  );
}

const PassageForm = (props: { onSave: (passage: Passage) => void }) => {
  const [passage, setPassage] = React.useState<PassageFormData>({
    book: undefined,
    chapter: undefined,
    startVerse: undefined,
    endVerse: undefined,
  });

  const handleSubmit = (next: (passage: Passage) => void) => () => {
    if (isPassage(passage)) {
      next(passage);
      handleClearForm();
    }
  };

  const handleClearForm = () => {
    setPassage(() => ({
      book: undefined,
      chapter: undefined,
      startVerse: undefined,
      endVerse: undefined,
    }));
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

  const books = bibleDirectory.map((book) => {
    return {
      value: book.bookIndex,
      label: book.bookName,
    };
  });

  const getChapterOptions = React.useMemo(() => {
    return (bookIndex: number) =>
      chapters(bookIndex).map((chapter) => ({
        value: chapter,
        label: chapter,
      })) ?? [];
  }, []);

  const getStartVerseOptions = React.useMemo(() => {
    return (bookIndex: number, chapterIndex: number) =>
      verses(bookIndex, chapterIndex);
  }, []);

  const getEndVerseOptions = React.useMemo(() => {
    return (bookIndex: number, chapterIndex: number, startVerse: number) =>
      verses(bookIndex, chapterIndex).toSpliced(0, startVerse - 1);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
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
        options={passage.book ? getChapterOptions(passage.book) : []}
        onChange={handleChapterChange}
      ></BasicSelect>
      <BasicSelect
        value={passage.startVerse}
        label="Starting Verse"
        name="startVerse"
        options={
          passage.chapter && passage.book
            ? getStartVerseOptions(passage.book, passage.chapter)
            : []
        }
        onChange={handleStartVerseChange}
      ></BasicSelect>
      <BasicSelect
        value={passage.endVerse}
        label="Ending Verse"
        options={
          passage.chapter && passage.book && passage.startVerse
            ? getEndVerseOptions(
                passage.book,
                passage.chapter,
                passage.startVerse
              )
            : []
        }
        name="endVerse"
        onChange={handleEndVerseChange}
      ></BasicSelect>
      <CustomButton onClick={handleSubmit(props.onSave)}>Save</CustomButton>
      <CustomButton onClick={handleClearForm}>Clear</CustomButton>
    </Box>
  );
};

export default PassageForm;

export { type PassageFormData, type Passage };
