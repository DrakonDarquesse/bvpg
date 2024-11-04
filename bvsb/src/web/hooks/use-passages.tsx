import React from "react";
import { Passage } from "@/web/components/passage-form";

type PassageWithId = { passage: Passage; id: number };
type Passages = PassageWithId[];

type UsePassagesReturn = [
  Passages,
  (passage: PassageWithId) => void,
  (id: number) => void
];

type Action =
  | {
      type: "add";
      passage: PassageWithId;
    }
  | {
      type: "remove";
      id: number;
    };

const reducer = (state: Passages, action: Action): Passages => {
  switch (action.type) {
    case "add": {
      return [...state, action.passage];
    }
    case "remove": {
      return state.filter((p) => p.id != action.id);
    }
  }
};

const usePassages = (): UsePassagesReturn => {
  const [passages, dispatch] = React.useReducer(reducer, []);

  const add = (passage: PassageWithId) => {
    dispatch({
      type: "add",
      passage,
    });
  };

  const remove = (id: number) => {
    dispatch({
      type: "remove",
      id,
    });
  };

  return [passages, add, remove];
};

export default usePassages;
