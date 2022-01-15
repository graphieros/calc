import "../styles/screen.css";
import { OperandProps } from "../types/types";

const Screen = ({ currentOperand, previousOperand }: OperandProps) => {
  return (
    <div className="screen">
      <div className="previous-operand">{previousOperand}</div>
      <div className="current-operand">{currentOperand}</div>
    </div>
  );
};

export default Screen;
