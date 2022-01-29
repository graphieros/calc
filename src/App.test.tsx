import { text } from "node:stream/consumers";
import { stack, feedStack, getColorTheme } from "./App";
import { Num } from "./types/types";

test("feedStack pushes an element to the stack", () => {
  let element: Num = {
    isPositive: true,
    value: 1,
    type: "digit",
    isVisible: true,
  };
  feedStack(element);
  expect(stack.length).toBe(1);
});

test("getColorTheme should return blue if param is 'blue'", () => {
  expect(getColorTheme("blue")).toBe("blue");
});

test("getColorTheme should return 'default' if fed any other param than 'blue'", () => {
  expect(getColorTheme("random string")).toBe("default");
  expect(getColorTheme("default")).toBe("default");
  expect(getColorTheme("")).toBe("default");
});
