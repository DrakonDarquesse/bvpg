import Box, { BoxProps } from "@mui/material/Box";
import { PropsWithChildren } from "react";

const CustomBox = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      {...props}
      sx={{
        p: {
          xl: 4,
          xs: 3,
        },
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.light",
        borderRadius: 2,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default CustomBox;
