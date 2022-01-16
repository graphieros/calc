import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import Screen from "./components/Screen";
import { ButtonValue, Calc, ClickEvent, Stack, Num } from "./types/types";
import { btnValues } from "./constants/index";

let stack: Stack = [];

const feedStack = (num: Num) => {
  stack.push(num);
};

function App() {
  let [calc, setCalc] = useState<Calc>({
    result: 0,
    memory: [],
  });

  const reset = (): void => {
    setCalc({
      ...calc,
      result: 0,
      memory: [],
    });
    stack = [];
  };

  const reverseSign = (): void => {
    if (!stack.length) {
      return;
    }
    feedStack({
      isPositive: false,
      value: "x",
      type: "operand",
      isVisible: false,
    });
    feedStack({
      isPositive: false,
      value: -1,
      type: "number",
      isVisible: false,
    });
    computeFromStack();
    stack = stack.slice(-3, -2); // removing 'x-1' previously fed to the stack
  };

  const computeFromStack = (): void => {
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

    setCalc({
      ...calc,
      result: result,
    });
  };

  const deleteDigit = () => {
    if (stack.length) {
      const lastStackElement = stack.pop() as Num;
      lastStackElement.value = Number(
        lastStackElement.value.toString().slice(0, -1)
      );
      stack.push(lastStackElement);
    }

    if (!calc.result) {
      stack = [];
    }

    const res = calc.result.toString().slice(0, -1);
    setCalc({
      ...calc,
      result: res,
    });
  };

  const renderHistory = (): string => {
    let res: (string | number)[] = [];

    stack.forEach((el: Num, i) => {
      switch (el.type) {
        case "number":
          if (el.isVisible) {
            res.push(el.value);
          }
          break;
        case "operand":
          if (el.isVisible) {
            res.push(el.value);
          }
          break;
        // case "dot":
        //   console.log(stack);
        //   if (!res.toString().includes(".")) {
        //     res.push(el.value);
        //   }
        // break;

        default:
          break;
      }
    });
    return res.join("");
  };

  const renderResult = () => {
    if (calc.result.toString().length > 9) {
      return Number(calc.result).toExponential();
    } else {
      return calc.result;
    }
  };

  const computeHandler = (e: ClickEvent): void => {
    e.preventDefault();
    let value = e.target?.dataset.value || "";
    let type = e.target?.dataset.type;

    let lastStackRecord = stack[stack.length - 1] || {
      isPositive: true,
      value: "",
      type: "",
      isVisible: false,
    };

    const isAnOperand = ["+", "-", "÷", "x"].includes(
      lastStackRecord.value.toString()
    );
    if (isAnOperand) {
      lastStackRecord = {
        isPositive: true,
        value: "",
        type: "",
        isVisible: false,
      };
    }

    switch (type) {
      case "reverse":
        reverseSign();
        break;
      case "clear":
        reset();
        break;
      case "delete":
        deleteDigit();
        break;
      case "equals":
        computeFromStack();
        break;

      case "number":
        let newVal = Number(lastStackRecord.value + value.toString());

        if (newVal.toString().length > 16) {
          return;
        }

        if (stack.length) {
          if (!isAnOperand) {
            stack.pop();
          }
        }
        feedStack({
          isPositive: newVal >= 0,
          value: newVal,
          type: type,
          isVisible: true,
        });
        computeFromStack();

        break;

      case "dot":
        if (!lastStackRecord.toString().includes(".")) {
          lastStackRecord.value = lastStackRecord.value + ".";
        }
        break;

      case "operand":
        if (isAnOperand) {
          stack.pop();
        }

        feedStack({
          isPositive: true,
          value: value,
          type: type,
          isVisible: true,
        });

        break;

      default:
        break;
    }
  };

  return (
    <section className="main-wrapper">
      <div className="calculator-grid">
        <Screen
          previousOperand={renderHistory() || "..."}
          currentOperand={renderResult() || 0}
        />
        {btnValues.flat().map((btn: ButtonValue, i: number) => {
          return (
            <Button
              key={i}
              value={btn.value}
              type={btn.type}
              className={`button-${btn.name} ${btn.shape}`}
              action={computeHandler}
            />
          );
        })}
      </div>
    </section>
  );
}

export default App;
