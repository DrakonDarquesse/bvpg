"use client";

import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import PassageForm, { Passage } from "@/web/components/passage-form";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const BibleReading = () => {
  const [passages, setPassages] = React.useState<
    { passage: Passage; id: number }[]
  >([]);

  const slideTypeData = {
    bibleReading: {
      label: "Bible Reading",
      value: "bible-reading",
    },

    responsiveReading: {
      label: "Responsive Reading",
      value: "responsive-reading",
    },
  };

  const [slideType, setSlideType] = React.useState<string>(
    slideTypeData.bibleReading.value
  );

  const handleSlideTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSlideType(() => value);
  };

  const passageFormHandler = (passage: Passage) => {
    setPassages((passages) => {
      return [...passages, { passage, id: passages.length }];
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetch(`/api/${slideType}`, {
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
        justifyContent: "space-between",
        alignItems: "safe center",
        flexDirection: "column",
        gap: 2,
        minHeight: "100%",
        px: 18,
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 4,
          width: "100%",
        }}
      >
        <Typography>Slide Builder</Typography>
        <Select size="small" onChange={handleSlideTypeChange} value={slideType}>
          {Object.values(slideTypeData).map((slideType, index) => {
            return (
              <MenuItem key={index} value={slideType.value}>
                {slideType.label}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          // flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
          "& > div": {
            minWidth: "280px",
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
          <PassageForm onSave={passageFormHandler}></PassageForm>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Build List:</Typography>
          <List
            sx={{
              flex: 1,
            }}
          >
            {passages.map(({ passage, id }, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    px: 0,
                  }}
                >
                  <ListItemText>
                    {passage.book} {passage.chapter}: {passage.startVerse}-
                    {passage.endVerse}
                  </ListItemText>
                  <Button onClick={deletePassage(id)}>x</Button>
                </ListItem>
              );
            })}
          </List>
          <Button onClick={handleSubmit} disabled={passages.length <= 0}>
            Build
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BibleReading;
