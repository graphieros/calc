import { stack } from "./App";
import { StackElement } from "./types/types";
import { feedStack, getColorTheme } from "./functions/index";

test("feedStack pushes an element to the stack", () => {
  let stackElement: StackElement = {
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
