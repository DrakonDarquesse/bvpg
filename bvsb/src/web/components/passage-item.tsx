import React from "react";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Box from "@mui/material/Box/Box";
import ClearIcon from "@mui/icons-material/Clear";
import { book } from "../../../public/data/bible-directory";
import { Passage } from "@/web/components/passage-form";

const PassageItem = (props: {
  key: React.Key;
  passage: Passage;
  passageId: number;
  deleteHandler: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <ListItem
      key={props.key}
      sx={{
        px: 0,
      }}
    >
      <ListItemText>
        {book(props.passage.book)?.bookName} {props.passage.chapter}:{" "}
        {props.passage.startVerse}-{props.passage.endVerse}
      </ListItemText>
      <Box
        onClick={props.deleteHandler}
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
};

export default PassageItem;
