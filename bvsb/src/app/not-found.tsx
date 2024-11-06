import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Header from "@/web/components/header";
import Footer from "@/web/components/footer";
import Divider from "@mui/material/Divider/Divider";
import React from "react";

type Scripture = {
  book: string;
  verse: string;
  text: string;
};

const NotFound = () => {
  const scriptureList: Scripture[] = [
    {
      book: "Psalm",
      verse: "40.4",
      text: `Blessed is the man who makes the Lord his trust, who does not turn to the proud, to those who go astray after a lie!`,
    },
    {
      book: "Philippians",
      verse: "4.04",
      text: `Rejoice in the Lord always; again I will say, rejoice.`,
    },
    {
      book: "Matthew",
      verse: "4.04",
      text: `But he answered, "It is written, 'Man shall not live by bread alone, but by every word that comes from the mouth of God.'"`,
    },
  ];

  // Select a random scripture
  const scripture =
    scriptureList[Math.floor(Math.random() * scriptureList.length)];

  return (
    <>
      <Header></Header>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="primary.dark">
          You found a scripture
        </Typography>

        {
          <Box
            sx={{
              display: {
                xs: "block",
                md: "flex",
              },
              gap: 4,
              p: 4,
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "primary.light",
              borderRadius: 4,
            }}
          >
            <Box>
              <Typography variant="overline">{scripture.book}</Typography>
              <Typography
                variant="h1"
                color="primary"
                sx={{
                  mb: {
                    xs: 1,
                    md: 0,
                  },
                  letterSpacing: 1,
                }}
              >
                {scripture.verse}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Typography variant="subtitle1" color="primary.contrastText">
              {scripture.text}
            </Typography>
          </Box>
        }
      </Box>

      <Footer></Footer>
    </>
  );
};

export default NotFound;
