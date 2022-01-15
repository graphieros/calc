export interface UnknownObj {
  [key: string]: string | number | any;
}

export interface ButtonValue {
  value: number | string;
  name: string;
  type: string;
  shape: string;
}

export interface Calc {
  sign: string;
  num: number | string;
  previousNum: number | string;
  result: number | string;
  memory: string[];
}

export type ClickEvent = {
  preventDefault: () => void;
  target: { innerHTML: string; dataset: ButtonValue };
};

export interface OperandProps {
  currentOperand: number | string;
  previousOperand: number | string;
}

export interface Num {
  isPositive: boolean;
  value: number | string;
  type: string;
  isVisible: boolean;
}

export type Stack = Num[];
