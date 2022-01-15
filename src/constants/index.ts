import { ButtonValue } from "../types/types";

export const btnValues = [
  [
    { type: "", value: "%", name: "percent", shape: "top" },
    { type: "", value: "√", name: "sqrt", shape: "top" },
    { type: "", value: "x²", name: "sqr", shape: "top" },
    { type: "", value: "1/x", name: "prop", shape: "top" },
    { type: "clear", value: "C", name: "C", shape: "" },
    { type: "", value: "DEL", name: "DEL", shape: "" },
    { type: "operand", value: "÷", name: "divide", shape: "L" },
    {
      type: "number",
      value: 7,
      name: "7",
      shape: "rounded",
    },
    { type: "number", value: 8, name: "8", shape: "rounded" },
    { type: "number", value: 9, name: "9", shape: "rounded" },
    { type: "operand", value: "X", name: "mult", shape: "L" },
    { type: "number", value: 4, name: "4", shape: "rounded" },
    { type: "number", value: 5, name: "5", shape: "rounded" },
    { type: "number", value: 6, name: "6", shape: "rounded" },
    { type: "operand", value: "-", name: "minus", shape: "L" },
    { type: "number", value: 1, name: "1", shape: "rounded" },
    { type: "number", value: 2, name: "2", shape: "rounded" },
    { type: "number", value: 3, name: "3", shape: "rounded" },
    { type: "operand", value: "+", name: "plus", shape: "L" },
    { type: "reverse", value: "+-", name: "invert", shape: "bottom" },
    { type: "number", value: 0, name: "0", shape: "rounded" },
    { type: "", value: ".", name: "dot", shape: "bottom" },
    { type: "equals", value: "=", name: "equals", shape: "L" },
  ],
] as unknown as ButtonValue[];
