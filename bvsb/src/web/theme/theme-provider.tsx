"use client";

import React, { type PropsWithChildren } from "react";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import systemTheme from ".";

const ClientThemeProvider = (props: PropsWithChildren) => {
  const system = systemTheme();
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: system.colors.primary.main,
          light: system.colors.primary.light,
          dark: system.colors.primary.dark,
          contrastText: system.colors.primary.darker,
        },
      },
      typography: {
        ...system.typography,
      },
    })
  );
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export { ClientThemeProvider };
