import "../styles/screen.css";
import { OperandProps } from "../types/types";

const Screen = ({ currentOperand, previousOperand }: OperandProps) => {
  function addSpaces(text: any) {
    // const separators = ["+", "x", "-", "÷"];
    let textWithSpaces = text
      .replaceAll("x", " x ")
      .replaceAll("+", " + ")
      .replaceAll("-", " - ")
      .replaceAll("÷", " ÷ ");
    return textWithSpaces;
  }

  return (
    <div className="screen">
      <div className="previous-operand">
        {addSpaces(previousOperand.toString())}
      </div>
      <div className="current-operand">{currentOperand.toLocaleString()}</div>
    </div>
  );
};

export default Screen;
