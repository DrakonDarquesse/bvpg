import React, { type PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ClientThemeProvider } from "../web/theme/theme-provider";

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html style={{ height: "100%" }}>
      <body style={{ height: "100%" }}>
        <CssBaseline />
        <ClientThemeProvider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              minHeight: "100%",
              px: {
                md: 18,
                xs: 4,
              },
              py: {
                xl: 4,
                xs: 1.5,
              },
            }}
          >
            {props.children}
          </Box>
        </ClientThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
