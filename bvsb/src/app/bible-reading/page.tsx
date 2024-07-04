"use client";

import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import PassageForm, { Passage } from "@/web/components/passage-form";

const BibleReading = () => {
  const [passages, setPassages] = React.useState<
    { passage: Passage; id: number }[]
  >([]);

  const passageFormHandler = (passage: Passage) => {
    setPassages((passages) => {
      return [...passages, { passage, id: passages.length }];
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetch("/api/bible-reading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ...passages.map((props) => ({
          book: props.passage.book,
          start_verse: {
            chapter: props.passage.chapter,
            verse: props.passage.startVerse,
          },
          end_verse: {
            chapter: props.passage.chapter,
            verse: props.passage.endVerse,
          },
        })),
      ]),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.setAttribute("download", "slide.pptx");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const deletePassage =
    (passageId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setPassages((passages) => {
        return passages.filter((p) => p.id != passageId);
      });
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        height: "100%",
        "& > div": {
          maxWidth: 360,
          padding: 4,
          border: 2,
          borderRadius: 2,
          borderColor: "grey",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <PassageForm onSave={passageFormHandler}></PassageForm>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          // height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {passages.length > 0 && (
          <List>
            {passages.map(({ passage, id }, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText>
                    {passage.book} {passage.chapter}: {passage.startVerse}-
                    {passage.endVerse}
                  </ListItemText>
                  <Button onClick={deletePassage(id)}>Delete</Button>
                </ListItem>
              );
            })}
          </List>
        )}
        <Button onClick={handleSubmit}>Build</Button>
      </Box>
    </Box>
  );
};

export default BibleReading;
