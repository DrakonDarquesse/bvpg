"use client";

import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Home = () => {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          p: 2,
          gap: 2,
          "& > a": {
            flex: "100%",
            p: 2,
            bgcolor: "primary.light",
            borderRadius: 2,
          },
        }}
      >
        <Link sx={{}} href="/bible-reading">
          Bible Reading
        </Link>
        <Link sx={{}} href="/responsive-reading">
          Responsive Reading
        </Link>
      </Box>
    </main>
  );
};

export default Home;
