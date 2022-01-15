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
    sign: "",
    num: 0,
    previousNum: 0,
    result: 0,
    memory: [],
  });

  const reset = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      previousNum: 0,
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
      value: "X",
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
    stack = stack.slice(-3, -2);
  };

  const computeFromStack = () => {
    let result = 0;
    let previousOperand = "+";

    const convertToResult = (previousOp: string, val: number | string) => {
      switch (previousOp) {
        case "÷":
          return result / Number(val);
        case "X":
          return result * Number(val);
        case "-":
          return result - Number(val);
        case "+":
        default:
          return result + Number(val);
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

        default:
          break;
      }
    });
    return res.join("");
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

    const isAnOperand = ["+", "-", "÷", "X"].includes(
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
      case "equals":
        computeFromStack();
        break;

      case "number":
        const newVal = Number(lastStackRecord.value + value.toString());

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
          previousOperand={renderHistory()}
          currentOperand={calc.result}
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
