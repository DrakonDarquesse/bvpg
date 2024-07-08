import React, { type PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useTheme from "@mui/material/styles/useTheme";

const Header = (props: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
        width: "100%",
        "& > div": {
          display: "flex",
          alignItems: "center",
          gap: 1,
        },
        "& .headerItem": {
          p: 1,
          borderRadius: 2,
          fontSize: theme.typography.h6,
          lineHeight: 1.5,
          textDecoration: "none",
          ":hover": {
            bgcolor: "primary.light",
          },
        },
      }}
    >
      <Box sx={{}}>
        <Link className="headerItem" href="/">
          Slide Builder
        </Link>
        {props.children}
      </Box>
      <Box>
        <Link href="/about" className="headerItem">
          About
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
