import { Calc, Stack, StackElement } from "../types/types";

export function feedStack(stack: Stack, stackElement: StackElement) {
  stack.push(stackElement);
}

export function getColorTheme(theme: string): string {
  switch (theme) {
    case "blue":
      return "blue";

    default:
      return "default";
  }
}

export function computeFromStack(stack: Stack): number {
  let result = 0;
  let previousOperand = "+";

  const convertToResult = (previousOp: string, val: number | string) => {
    switch (previousOp) {
      case "÷":
        return result / Number(val);
      case "x":
        return result * Number(val);
      case "-":
        return result - Number(val);
      case "+":
        return result + Number(val);
      default:
        return result;
    }
  };

  stack.forEach((el) => {
    switch (el.type) {
      case "number":
        result = convertToResult(previousOperand, Number(el.value));
        break;
      case "operand":
        previousOperand = el.value.toString();
        break;

      default:
        break;
    }
  });

  return Math.round(result * 1_000) / 1_000;
}

export function deleteDigit(calc: Calc, stack: Stack): string {
  if (stack.length) {
    const lastStackElement = stack.pop() as StackElement;
    lastStackElement.value = Number(
      lastStackElement.value.toString().slice(0, -1)
    );
    stack.push(lastStackElement);
  }

  if (!calc.result) {
    stack = [];
  }

  return calc.result.toString().slice(0, -1);
}

export function renderHistory(stack: Stack): string {
  let res: (string | number)[] = [];

  stack.forEach((stackElement: StackElement) => {
    switch (stackElement.type) {
      case "number":
        if (stackElement.isVisible) {
          res.push(stackElement.value);
        }
        break;
      case "operand":
        if (stackElement.isVisible) {
          res.push(stackElement.value);
        }
        break;

      default:
        break;
    }
  });
  return res.join("");
}

export function calculateResultFromOperand(type: string, calc: Calc): number {
  switch (type) {
    case "percent":
      return ((calc.result as number) /= Math.pow(100, 1));

    case "squareRoot":
      return Math.sqrt(calc.result as number);

    case "square":
      return Math.pow(calc.result as number, 2);

    case "inverse":
      return 1 / (calc.result as number);

    default:
      return NaN;
  }
}
