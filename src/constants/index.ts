import { ButtonValue } from "../types/types";

export const btnValues = [
  [
    {
      type: "percent",
      value: "%",
      name: "percent",
      shape: " calc-button calc-button top",
    },
    { type: "squareRoot", value: "√", name: "sqrt", shape: " calc-button top" },
    { type: "square", value: "x²", name: "sqr", shape: " calc-button top" },
    { type: "inverse", value: "1/x", name: "prop", shape: " calc-button top" },
    { type: "clear", value: "C", name: "C", shape: " calc-button " },
    { type: "delete", value: "DEL", name: "DEL", shape: " calc-button " },
    { type: "operand", value: "÷", name: "divide", shape: " calc-button L" },
    {
      type: "number",
      value: 7,
      name: "7",
      shape: " calc-button rounded",
    },
    { type: "number", value: "8", name: "8", shape: " calc-button rounded" },
    { type: "number", value: "9", name: "9", shape: " calc-button rounded" },
    { type: "operand", value: "x", name: "mult", shape: " calc-button L" },
    { type: "number", value: "4", name: "4", shape: " calc-button rounded" },
    { type: "number", value: "5", name: "5", shape: " calc-button rounded" },
    { type: "number", value: "6", name: "6", shape: " calc-button rounded" },
    { type: "operand", value: "-", name: "minus", shape: " calc-button L" },
    { type: "number", value: "1", name: "1", shape: " calc-button rounded" },
    { type: "number", value: "2", name: "2", shape: " calc-button rounded" },
    { type: "number", value: "3", name: "3", shape: " calc-button rounded" },
    { type: "operand", value: "+", name: "plus", shape: " calc-button L" },
    {
      type: "reverse",
      value: "+-",
      name: "invert",
      shape: " calc-button bottom",
    },
    { type: "number", value: "0", name: "0", shape: " calc-button rounded" },
    { type: "dot", value: ".", name: "dot", shape: " calc-button bottom" },
    { type: "equals", value: "=", name: "equals", shape: " calc-button L" },
  ],
] as unknown as ButtonValue[];
