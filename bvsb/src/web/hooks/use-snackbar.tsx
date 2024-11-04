import React from "react";

type AlertState = {
  severity: "success" | "info" | "error";
  message: string;
};

type UseSnackbarReturn = {
  severity: AlertState["severity"];
  message: AlertState["message"];
  success: (message: string) => void;
  error: (message: string) => void;
};

const useSnackbar = (): UseSnackbarReturn => {
  const [alert, setAlert] = React.useState<AlertState>({
    severity: "info",
    message: "",
  });

  const success = (message: string) =>
    setAlert({
      severity: "success",
      message,
    });

  const error = (message: string) =>
    setAlert({
      severity: "error",
      message,
    });

  return { ...alert, success, error };
};

export default useSnackbar;
