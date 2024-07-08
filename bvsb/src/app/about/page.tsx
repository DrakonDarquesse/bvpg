"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "@/web/components/header";
import Footer from "@/web/components/footer";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        minHeight: "100%",
        px: 18,
        py: {
          xl: 4,
          xs: 1.5,
        },
      }}
    >
      <Header></Header>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: {
            lg: "nowrap",
            xs: "wrap",
          },
          gap: 4,
          justifyContent: "center",
          "& > div": {
            minWidth: "280px",
            maxWidth: {
              xl: "400px",
            },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            p: {
              xl: 4,
              xs: 3,
            },
            bgcolor: "primary.light",
            borderRadius: 2,
          },
        }}
      >
        <Box>
          <Typography variant="subtitle1">What's this for</Typography>
          <Typography>
            {`
            Slide Builder creates PowerPoint Presentation files in which the slides are bible passages. The slides can be used during a church service (particularly a Methodist).
            Slide Builder can create slides for bible reading and responsive reading, which are parts of the flow of a Methodist worship service.s 
              `}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Why</Typography>
          <Typography>
            {`
              In my church, we use PowerPoint slides to display bible passages duing a church service.
              I find it a hassle to copy the bible verses and paste them into the slides.
              So, this project came into being to make my life easier, and hopefully the subsequent persons in charge of making the slides.
              `}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">How to Use</Typography>
          <Typography>
            {`
                Fill in the bible passage form and submit. The bible passage will show up at the build list. Click Build and it will call the API which will return the PowerPoint slides. The format of the slides is based on the template given.
            `}
          </Typography>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default About;
