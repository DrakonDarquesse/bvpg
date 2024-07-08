import Button, { ButtonProps } from "@mui/material/Button";
import { PropsWithChildren } from "react";

const CustomButton = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      sx={{
        ":hover": {
          bgcolor: "white",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
