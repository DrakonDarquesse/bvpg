"use client";

import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import BasicSelect, { Option } from "../web/components/basic-select";
import BibleDirectory from "../../public/data/bible-directory.json";

type Passage = {
  book: keyof typeof BibleDirectory | null;
  chapter: number | null;
  startVerse: number | null;
  endVerse: number | null;
};
const Home = () => {
  const [passages, setPassage] = React.useState<Passage[]>([
    { book: null, chapter: null, startVerse: null, endVerse: null },
    { book: null, chapter: null, startVerse: null, endVerse: null },
  ]);

  const handleChange = <K extends keyof Passage>(
    event: SelectChangeEvent<Passage[K]>,
    formIndex: number,
    selectKey: K,
    dependentKey: (keyof Passage)[]
  ) => {
    const target = event.target;
    setPassage((passages) => {
      const newPassages = [...passages];
      newPassages[formIndex][selectKey] = target.value as Passage[K];
      for (const key of dependentKey) {
        newPassages[formIndex][key] = null;
      }
      return newPassages;
    });

    console.log(passages);
  };

  // const books = [
  //   "Genesis",
  //   "Exodus",
  //   "Levicitus",
  //   "Numbers",
  //   "Deuteronomy",
  //   "Joshua",
  // ];

  const books = [
    { value: "Genesis", label: "Genesis" },
    { value: "Exodus", label: "Exodus" },
  ];

  const getChapterOptions = React.useMemo(() => {
    return (book: keyof typeof BibleDirectory) =>
      Array.from(Array(BibleDirectory[book].length).keys()).map((chapter) => ({
        value: chapter,
        label: chapter,
      })) || [];
  }, []);

  return (
    <main>
      {passages.map((passage, index) => {
        return (
          <>
            <BasicSelect
              value={passage.book}
              label="aa"
              onChange={handleChange}
              options={books}
              formIndex={index}
              selectKey="book"
              dependentKey={["chapter"]}
            ></BasicSelect>
            <BasicSelect
              value={passage.chapter}
              label="chapter"
              onChange={handleChange}
              options={passage.book ? getChapterOptions(passage.book) : []}
              formIndex={index}
              selectKey="chapter"
              dependentKey={[]}
            ></BasicSelect>
          </>
        );
      })}
      <Button></Button>
    </main>
  );
};

export default Home;

export { type Passage };
