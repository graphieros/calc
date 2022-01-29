import { Stack, StackElement } from "./types/types";
import { feedStack, getColorTheme } from "./functions/index";
import { computeFromStack } from "./functions/index";

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

// //write a test for computeFromStack that checks if the result is correct
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
