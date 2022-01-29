import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import Screen from "./components/Screen";
import {
  ButtonValue,
  Calc,
  ClickEvent,
  Stack,
  StackElement,
  CalcHistory,
} from "./types/types";
import { btnValues } from "./constants/index";
import Cta from "./components/Cta";
import Brand from "./components/Brand";
import PostIt from "./components/PostIt";

export let stack: Stack = [];

export const feedStack = (stackElement: StackElement) => {
  stack.push(stackElement);
};

export const getColorTheme = (theme: string): string => {
  switch (theme) {
    case "blue":
      return "blue";

    default:
      return "default";
  }
};

function App() {
  let [postIt, setPostIt] = useState({
    visible: false,
    history: [] as CalcHistory[],
  });

  let [colorTheme, setColorTheme] = useState({
    theme: "default",
  });

  const changeTheme = (e: string) => {
    setColorTheme({
      theme: e,
    });
  };

  const deleteHistory = () => {
    setPostIt({
      ...postIt,
      history: [],
      visible: false,
    });
  };

  const postItVisibilityHandler = (): void => {
    if (calc.result) {
      setPostIt({
        ...postIt,
        visible: !postIt.visible,
        history: [
          ...postIt.history,
          {
            date: new Date().toLocaleString(),
            calc: renderHistory(),
            result: renderResult(),
          },
        ] as CalcHistory[],
      });
    } else {
      setPostIt({
        ...postIt,
        visible: !postIt.visible,
      });
    }
    reset();
  };

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
      result: Math.round(result * 1_000) / 1_000,
    });
  };

  const deleteDigit = () => {
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

    const res = calc.result.toString().slice(0, -1);
    setCalc({
      ...calc,
      result: res,
    });
  };

  const renderHistory = (): string => {
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
  };

  const renderResult = () => {
    if (calc.result.toString().length > 12) {
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

    const isZeroAfterZero =
      stack.length === 1 && value === "0" && stack[0].value === "0";

    switch (type) {
      case "reverse":
        const reversed = -1 * (lastStackRecord.value as number);
        lastStackRecord.value = reversed;
        computeFromStack();
        break;
      case "clear":
        reset();
        break;
      case "delete":
        deleteDigit();
        break;
      case "equals":
        computeFromStack();
        postItVisibilityHandler();
        break;

      case "number":
        if (isZeroAfterZero) {
          return;
        }
        let newVal = lastStackRecord.value + value.toString();

        if (newVal.toString().length > 16) {
          return;
        }

        if (stack.length) {
          if (!isAnOperand) {
            stack.pop();
          }
        }
        feedStack({
          isPositive: Number(newVal) >= 0,
          value: newVal,
          type: type,
          isVisible: true,
        });
        computeFromStack();

        break;

      case "dot":
        lastStackRecord.value = (lastStackRecord.value + ".").replaceAll(
          "..",
          "."
        );

        break;

      case "percent":
        const percentRes = ((calc.result as number) /= Math.pow(100, 1));
        lastStackRecord.value = percentRes;
        setCalc({
          ...calc,
          result: percentRes,
        });
        break;

      case "squareRoot":
        const squareRoot = Math.sqrt(calc.result as number);
        lastStackRecord.value = squareRoot;
        setCalc({
          ...calc,
          result: squareRoot,
        });
        break;

      case "square":
        const square = Math.pow(calc.result as number, 2);
        lastStackRecord.value = square;
        setCalc({
          ...calc,
          result: square,
        });
        break;

      case "inverse":
        const inverse = 1 / (calc.result as number);
        lastStackRecord.value = inverse;
        setCalc({
          ...calc,
          result: inverse,
        });
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
        <Brand />
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
              className={`button-${btn.name} ${btn.shape} ${getColorTheme(
                colorTheme.theme
              )}`}
              action={computeHandler}
            />
          );
        })}
        <div className="theme-selector-wrapper">
          <label htmlFor="theme-selector">Theme:</label>
          <select
            name="theme-selector"
            className="theme-selector"
            onChange={(e) => changeTheme(e.target.value)}
          >
            <option>default</option>
            <option>blue</option>
          </select>
        </div>
      </div>

      {postIt.visible ? (
        <PostIt
          history={postIt.history as CalcHistory[]}
          action={postItVisibilityHandler}
          deleteHistory={deleteHistory}
        />
      ) : (
        <></>
      )}

      <Cta />
    </section>
  );
}

export default App;
