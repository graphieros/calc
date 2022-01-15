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

  // const numClickHandler = (e: ClickEvent): void => {
  //   e.preventDefault();
  //   let value = e.target?.dataset.value;
  //   let type = e.target?.dataset.type;

  //   if (calc.num.toString().length < 16) {
  //     setCalc({
  //       ...calc,
  //       num:
  //         calc.num === 0 && value === "0"
  //           ? "0"
  //           : Number(calc.num) % 1 === 0
  //           ? Number(calc.num + value)
  //           : calc.num + value,
  //       result: !calc.sign ? 0 : calc.result,
  //     });
  //     stack.push({ value: Number(value), type: type });
  //   }
  // };

  const reverseSign = (): void => {
    console.log({ stackFromReverse: stack });
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

  // const percentClickHandler = (): void => {
  //   let num = calc.num ? parseFloat(calc.num.toString()) : 0;
  //   let result = calc.result ? parseFloat(calc.result.toString()) : 0;

  //   setCalc({
  //     ...calc,
  //     num: (num /= Math.pow(100, 1)),
  //     result: (result /= Math.pow(100, 1)),
  //     sign: "",
  //   });
  // };

  // const equalsClickHandler = (): void => {
  //   if (calc.sign && calc.num) {
  //     const math = (a: number, b: number, sign: string) =>
  //       sign === "+"
  //         ? a + b
  //         : sign === "-"
  //         ? a - b
  //         : sign === "X"
  //         ? a * b
  //         : a / b;

  //     setCalc({
  //       ...calc,
  //       result:
  //         calc.num === "0" && calc.sign === "/"
  //           ? "Can't divide with 0"
  //           : math(Number(calc.result), Number(calc.num), calc.sign),
  //       sign: "",
  //       num: 0,
  //       memory: ["..."],
  //     });
  //   }
  // };

  const computeFromStack = () => {
    let result = 0;
    let previousOperand = "+";

    const convertToResult = (previousOp: string, val: number | string) => {
      console.log({ previousOp, val });

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
      console.log({ previousOperand, result });
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

    console.log({ result });
  };

  // const operandClickHandler = (e: ClickEvent): void => {
  //   e.preventDefault();
  //   const buttonVal = e.target?.dataset.value;

  //   const memo = [...calc.memory, calc.num.toString(), buttonVal];

  //   stack.push(buttonVal);

  //   // const result = () => {
  //   //   if (!calc.result && calc.num) {
  //   //     return calc.num;
  //   //   }
  //   //   return calc.result;
  //   // };

  //   computeFromStack();

  //   setCalc({
  //     ...calc,
  //     sign: buttonVal,
  //     // result: result(),
  //     num: 0,
  //     previousNum: calc.num,
  //     memory: [...memo],
  //   });
  // };

  // const dotClickHandler = (e: ClickEvent): void => {
  //   e.preventDefault();
  //   const dot = e.target.innerHTML;

  //   setCalc({
  //     ...calc,
  //     num: !calc.num.toString().includes(".") ? calc.num + dot : calc.num,
  //   });
  // };

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

    // console.log({ value, type });
    console.log({ stackComputed: stack });

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

    console.log({ lastStackRecord, value });
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
        setCalc({
          ...calc,
          sign: value,
        });

        feedStack({
          isPositive: true,
          value: value,
          type: type,
          isVisible: true,
        });

        // console.log("HERE");

        break;

      default:
        break;
    }

    // click digit
    // save digit in memo

    // click operand
    // store operand
    // if previous digit, compute with next digit

    // click equal
    // computeStack
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
