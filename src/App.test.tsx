import { Stack, StackElement } from "./types/types";
import { feedStack, getColorTheme } from "./functions/index";
import {
  computeFromStack,
  deleteDigit,
  renderHistory,
  calculateResultFromOperand,
} from "./functions/index";

let stack: Stack = [];

beforeEach((): void => {
  stack = [];
});

test("feedStack pushes an element to the stack", () => {
  const stackElement: StackElement = {
    isPositive: true,
    value: 1,
    type: "digit",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  expect(stack.length).toBe(1);
  expect(stack[0]).toStrictEqual({ ...stackElement });
});

test("getColorTheme should return blue if param is 'blue'", () => {
  expect(getColorTheme("blue")).toBe("blue");
});

test("getColorTheme should return 'default' if fed any other param than 'blue'", () => {
  expect(getColorTheme("random string")).toBe("default");
  expect(getColorTheme("default")).toBe("default");
  expect(getColorTheme("")).toBe("default");
});

test("computeFromStack should return the correct result", () => {
  let stackElement: StackElement = {
    isPositive: true,
    value: 1,
    type: "number",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  stackElement = {
    isPositive: true,
    value: "x",
    type: "operand",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  stackElement = {
    isPositive: true,
    value: "2",
    type: "number",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  expect(computeFromStack(stack)).toBe(2);
});

test("deleteDigit should remove the last character from the calc.result", () => {
  let stackElement: StackElement = {
    isPositive: true,
    value: 11,
    type: "number",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  const calc = { result: computeFromStack(stack), memory: [] };
  const result = deleteDigit(calc, stack);

  expect(result).toBe("1");
});

//write a test for renderHistory that simulates the following:
test("renderHistory should return a string with the calculator history", () => {
  let stackElement: StackElement = {
    isPositive: true,
    value: 11,
    type: "number",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  stackElement = {
    isPositive: true,
    value: "-",
    type: "operand",
    isVisible: true,
  };
  feedStack(stack, stackElement);
  stackElement = {
    isPositive: true,
    value: "2",
    type: "number",
    isVisible: true,
  };
  feedStack(stack, stackElement);

  expect(renderHistory(stack)).toBe("11-2");
});

test("calculateResultFromOperand should return the correct result", () => {
  expect(
    calculateResultFromOperand("percent", { result: "2", memory: [] })
  ).toBe(0.02);
  expect(
    calculateResultFromOperand("squareRoot", { result: "2", memory: [] })
  ).toBe(1.4142135623730951);
  expect(
    calculateResultFromOperand("square", { result: "2", memory: [] })
  ).toBe(4);
  expect(
    calculateResultFromOperand("inverse", { result: "2", memory: [] })
  ).toBe(0.5);
  expect(
    calculateResultFromOperand("number", { result: "2", memory: [] })
  ).toBe(NaN);
});
