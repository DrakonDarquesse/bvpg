"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { type Passage } from "@/app/page";

type Option = {
  value: string | number;
  label: string | number;
};

// type SelectProps = {
//   value: string;
//   onChange: (
//     event: React.ChangeEvent<{ value: unknown }>,
//     formIndex: number,
//     selectKey: string
//   ) => void;
//   label: string;
//   options: Option[];
//   formIndex: number;
//   selectKey: string;
// };

const BasicSelect = (props: {
  value: Passage[keyof Passage];
  onChange: <K extends keyof Passage>(
    event: SelectChangeEvent<Passage[K]>,
    formIndex: number,
    selectKey: K,
    dependentKey: (keyof Passage)[]
  ) => void;
  label: string;
  options: Option[];
  formIndex: number;
  selectKey: keyof Passage;
  dependentKey: (keyof Passage)[];
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={(e) =>
          props.onChange(
            e,
            props.formIndex,
            props.selectKey,
            props.dependentKey
          )
        }
        name={props.selectKey}
      >
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;

export type { Option };
