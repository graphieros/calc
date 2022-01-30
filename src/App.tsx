import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import Screen from "./components/Screen";
import {
  ButtonValue,
  Calc,
  ClickEvent,
  Stack,
  CalcHistory,
} from "./types/types";
import { btnValues } from "./constants/index";
import Cta from "./components/Cta";
import Brand from "./components/Brand";
import PostIt from "./components/PostIt";
import {
  feedStack,
  getColorTheme,
  computeFromStack,
  deleteDigit,
  renderHistory,
  calculateResultFromOperand,
} from "./functions";

export let stack: Stack = [];

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
            calc: renderHistory(stack),
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

  const compute = (): void => {
    const result = computeFromStack(stack);

    setCalc({
      ...calc,
      result: Math.round(result * 1_000) / 1_000,
    });
  };

  const deleteInput = (): void => {
    const res = deleteDigit(calc, stack);
    setCalc({
      ...calc,
      result: res,
    });
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

    switch (type) {
      case "reverse":
        const reversed = -1 * (lastStackRecord.value as number);
        lastStackRecord.value = reversed;
        compute();
        return;
      case "clear":
        reset();
        return;
      case "delete":
        deleteInput();
        return;
      case "equals":
        compute();
        postItVisibilityHandler();
        return;
      default:
        break;
    }

    const isZeroAfterZero =
      stack.length === 1 && value === "0" && stack[0].value === "0";

    switch (type) {
      case "dot":
        lastStackRecord.value = (lastStackRecord.value + ".").replaceAll(
          "..",
          "."
        );
        return;

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
        feedStack(stack, {
          isPositive: Number(newVal) >= 0,
          value: newVal,
          type: type,
          isVisible: true,
        });
        compute();

        return;

      case "operand":
        if (isAnOperand) {
          stack.pop();
        }

        feedStack(stack, {
          isPositive: true,
          value: value,
          type: type,
          isVisible: true,
        });
        return;
      default:
        break;
    }

    const result = calculateResultFromOperand(type, calc);

    setCalc({
      ...calc,
      result,
    });
    lastStackRecord.value = result;
  };

  return (
    <section className="main-wrapper">
      <div className="calculator-grid">
        <Brand />
        <Screen
          previousOperand={renderHistory(stack) || "..."}
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
