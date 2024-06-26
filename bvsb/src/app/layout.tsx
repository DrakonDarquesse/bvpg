import React, { type PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";
import { ClientThemeProvider } from "../web/theme/theme-provider";

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html style={{ height: "100%" }}>
      <body>
        <CssBaseline />
        <ClientThemeProvider>{props.children}</ClientThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
