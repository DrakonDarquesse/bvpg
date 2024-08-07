"use client";

import React from "react";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import BasicSelect from "./basic-select";
import bibleDirectory from "../../../public/data/bible-directory";
import CustomButton from "./custom-button";

// ? add id because the parent component need to identify
type Passage = {
  book: number | undefined;
  chapter: number | undefined;
  startVerse: number | undefined;
  endVerse: number | undefined;
};

const PassageForm = (props: { onSave: (passage: Passage) => void }) => {
  const [passage, setPassage] = React.useState<Passage>({
    book: undefined,
    chapter: undefined,
    startVerse: undefined,
    endVerse: undefined,
  });

  const handleSubmit = (next: (passage: Passage) => void) => () => {
    if (
      passage.book &&
      passage.chapter &&
      passage.endVerse &&
      passage.startVerse
    ) {
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
    return (bookIndex: number | undefined) =>
      bibleDirectory
        .find((val) => val.bookIndex == bookIndex)
        ?.chapters.map((chapter) => ({
          value: chapter.chapterNum,
          label: chapter.chapterNum,
        })) ?? [];
  }, []);

  const getStartVerseOptions = React.useMemo(() => {
    return (passage: Passage) =>
      Array.from(
        Array(
          bibleDirectory
            .find((val) => val.bookIndex == passage.book)
            ?.chapters.find((val) => val.chapterNum == passage.chapter)
            ?.numOfVerse
        ).keys()
      ).map((num) => num + 1);
  }, []);

  const getEndVerseOptions = React.useMemo(() => {
    return (passage: Passage) =>
      // ? split this part as its individual function because got duplicate?
      Array.from(
        Array(
          bibleDirectory
            .find((val) => val.bookIndex == passage.book)
            ?.chapters.find((val) => val.chapterNum == passage.chapter)
            ?.numOfVerse
        ).keys()
      )
        .toSpliced(0, passage.startVerse ? passage.startVerse - 1 : 0)
        .map((num) => num + 1);
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
        options={getChapterOptions(passage.book)}
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
      <CustomButton onClick={handleSubmit(props.onSave)}>Save</CustomButton>
      <CustomButton onClick={handleClearForm}>Clear</CustomButton>
    </Box>
  );
};

export default PassageForm;

export { type Passage };
