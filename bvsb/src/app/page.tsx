"use client";

import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import Header from "@/web/components/header";
import Footer from "@/web/components/footer";
import ClearIcon from "@mui/icons-material/Clear";
import PassageForm, { Passage } from "@/web/components/passage-form";
import CustomButton from "@/web/components/custom-button";
import CustomBox from "@/web/components/custom-box";

const BibleReading = () => {
  const theme = useTheme();

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
    (passageId: number) => (event: React.MouseEvent<HTMLElement>) => {
      setPassages((passages) => {
        return passages.filter((p) => p.id != passageId);
      });
    };

  return (
    <>
      <Header>
        <Select
          onChange={handleSlideTypeChange}
          value={slideType}
          className="headerItem"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              p: 0,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 3,
                "& .MuiMenuItem-root": {
                  padding: 2,
                  fontSize: theme.typography.h6,
                },
              },
              elevation: 1,
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          {Object.values(slideTypeData).map((slideType, index) => {
            return (
              <MenuItem key={index} value={slideType.value}>
                {slideType.label}
              </MenuItem>
            );
          })}
        </Select>
      </Header>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
          "& > div": {
            minWidth: "280px",
            maxWidth: "400px",
            p: {
              xl: 4,
              xs: 3,
            },
            bgcolor: "primary.light",
            borderRadius: 2,
          },
        }}
      >
        <CustomBox
          sx={{
            width: "100%",
          }}
        >
          <PassageForm onSave={passageFormHandler}></PassageForm>
        </CustomBox>
        <CustomBox
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
                  <Box
                    onClick={deletePassage(id)}
                    sx={{
                      p: 0.5,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      ":hover": {
                        bgcolor: "white",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <ClearIcon color="primary"></ClearIcon>
                  </Box>
                </ListItem>
              );
            })}
          </List>
          <CustomButton onClick={handleSubmit} disabled={passages.length <= 0}>
            Build
          </CustomButton>
        </CustomBox>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default BibleReading;
