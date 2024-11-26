"use client";

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

const slideTypeData = {
  bibleReading: {
    label: "Bible Reading",
    value: "bible-reading",
  },

  responsiveReading: {
    label: "Responsive Reading",
    value: "responsive-reading",
  },
} as const;

type SlideTypeData = typeof slideTypeData;
type SlideType = SlideTypeData[keyof SlideTypeData]["value"];

const SlideSelect = (props: SelectProps<SlideType>) => {
  const theme = useTheme();

  return (
    <Select
      {...props}
      sx={{
        p: 1,
        borderRadius: 2,
        fontSize: theme.typography.h6,
        lineHeight: 1.5,
        textDecoration: "none",
        ":hover": {
          bgcolor: "primary.light",
        },

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
        ...props.sx,
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: 3,
            "& .MuiMenuItem-root": {
              padding: 2,
              fontSize: theme.typography.subtitle1,
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
  );
};

export default SlideSelect;

export { type SlideType };
