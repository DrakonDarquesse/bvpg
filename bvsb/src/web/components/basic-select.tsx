"use client";

import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Option = {
  value: string | number;
  label: string | number;
};

const BasicSelect = <K,>(props: {
  value: K | undefined;
  onChange: (event: SelectChangeEvent<K>) => void;
  label: string;
  options: (Option | string | number)[];
  name: string;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value ?? ""}
        onChange={props.onChange}
        name={props.name}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.options.map((option) => {
          const createMenuItem = (
            value: string | number,
            label: string | number
          ) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
          if (typeof option === "object" && "label" in option) {
            return createMenuItem(option.value, option.label);
          }
          return createMenuItem(option, option);
        })}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;

export type { Option };
