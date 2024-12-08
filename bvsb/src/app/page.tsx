"use client";

import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import PassageForm, { Passage } from "@/web/components/passage-form";
import CustomButton from "@/web/components/custom-button";
import CustomBox from "@/web/components/custom-box";
import Header from "@/web/components/header";
import Footer from "@/web/components/footer";
import useSnackbar from "@/web/hooks/use-snackbar";
import usePassages from "@/web/hooks/use-passages";
import SlideSelect, { type SlideType } from "@/web/components/slide-select";
import PassageItem from "@/web/components/passage-item";

const BibleReading = () => {
  useTheme();

  // manage slide format state
  const [slideType, setSlideType] = React.useState<SlideType>("bible-reading");

  const snackbar = useSnackbar();

  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const [passages, addPassage, removePassage] = usePassages();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSlideTypeChange = (event: SelectChangeEvent<SlideType>) => {
    const value = event.target.value as SlideType;
    setSlideType(() => value);
  };

  const id = React.useRef<number>(0);

  const passageFormHandler = (passage: Passage) => {
    addPassage({ passage, id: id.current++ });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
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

    setLoading(false);

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
      snackbar.success("Slides created!");
    } else {
      snackbar.error("An error occurred while creating slides");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const deletePassage =
    (passageId: number) => (_: React.MouseEvent<HTMLElement>) => {
      removePassage(passageId);
    };

  return (
    <>
      <Header>
        <SlideSelect
          value={slideType}
          onChange={handleSlideTypeChange}
          sx={{
            display: {
              md: "block",
              xs: "none",
            },
          }}
        ></SlideSelect>
      </Header>
      <SlideSelect
        value={slideType}
        onChange={handleSlideTypeChange}
        sx={{
          display: {
            md: "none",
          },
        }}
      ></SlideSelect>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: {
            md: "nowrap",
            xs: "wrap",
          },
          gap: 6,
          justifyContent: "center",
          "& > div": {
            minWidth: "280px",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <CustomBox>
          <PassageForm onSave={passageFormHandler}></PassageForm>
        </CustomBox>
        <CustomBox>
          <Typography>Build List:</Typography>
          <List
            sx={{
              flex: 1,
            }}
          >
            {passages.map(({ passage, id }, index) => {
              return (
                <PassageItem
                  key={index}
                  passage={passage}
                  passageId={id}
                  deleteHandler={deletePassage(id)}
                ></PassageItem>
              );
            })}
          </List>
          <CustomButton
            onClick={handleSubmit}
            disabled={passages.length <= 0 || loading}
          >
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CircularProgress size={20} />
              </Box>
            )}
            Build
          </CustomButton>
        </CustomBox>
      </Box>
      <Footer></Footer>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={handleSnackbarClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BibleReading;
