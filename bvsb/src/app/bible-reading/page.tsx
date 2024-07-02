"use client";

import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import PassageForm, { Passage } from "@/web/components/passage-form";

const ResponsiveReading = () => {
  const [passages, setPassages] = React.useState<
    { passage: Passage; id: number }[]
  >([]);

  const [editingPassageId, setEditingPassageId] = React.useState<number | null>(
    null
  );
  const [formEnabled, setFormEnabled] = React.useState<boolean>(true);

  const passageFormHandler = (passage: Passage) => {
    setPassages((passages) => {
      console.log(editingPassageId);
      return editingPassageId != null
        ? passages.map((p) => {
            if (p.id == editingPassageId) {
              return { passage, id: editingPassageId };
            }
            return p;
          })
        : [...passages, { passage, id: passages.length }];
    });

    setEditingPassageId(() => null);
    setFormEnabled(() => true);
  };

  const addPassage = () => setFormEnabled(() => true);

  const editPassage =
    (passage: { passage: Passage; id: number }) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(passage);
      setEditingPassageId(() => {
        return passage.id;
      });
      setFormEnabled(() => true);
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

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setEditingPassageId(() => null);
    setFormEnabled(() => false);
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
        // "& > div": {
        //   flex: "100%",
        // },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          padding: 4,
          border: 2,
          borderRadius: 2,
          borderColor: "grey",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {formEnabled && (
            <PassageForm
              passage={passages.find((p) => p.id == editingPassageId)?.passage}
              onSave={passageFormHandler}
            ></PassageForm>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          // height: "100%",
          maxWidth: 360,
          padding: 2,
          border: 2,
          borderRadius: 2,
          borderColor: "grey",
        }}
      >
        {passages.length > 0 && (
          <List>
            {passages.map(({ passage, id }, index) => {
              return (
                <ListItem key={index} sx={{}}>
                  <ListItemText>
                    {passage.book} {passage.chapter}: {passage.startVerse}-
                    {passage.endVerse}
                  </ListItemText>
                  <Button
                    onClick={editPassage({ passage, id })}
                    disabled={formEnabled}
                  >
                    Edit
                  </Button>
                  <Button onClick={deletePassage(id)} disabled={formEnabled}>
                    Delete
                  </Button>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default ResponsiveReading;
