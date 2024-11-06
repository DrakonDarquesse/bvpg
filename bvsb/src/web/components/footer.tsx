"use client";

import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import useTheme from "@mui/material/styles/useTheme";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
        alignItems: "center",
        width: "100%",
        "> a": {
          display: "flex",
          justifyContent: "center",
          p: 1,
          borderRadius: 2,
          fontSize: theme.typography.h5,
          ":hover": {
            bgcolor: "primary.light",
          },
        },
      }}
    >
      <Link href="mailto:mingliangzheng17@gmail.com">
        <MailIcon fontSize="inherit"></MailIcon>
      </Link>
      <Link href="https://github.com/DrakonDarquesse/bvpg">
        <GitHubIcon fontSize="inherit"></GitHubIcon>
      </Link>
    </Box>
  );
};

export default Footer;
