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

export interface StackElement {
  isPositive: boolean;
  value: number | string;
  type: string;
  isVisible: boolean;
}

export type Stack = StackElement[];

export interface CalcHistory {
  date: string | Date;
  calc: string;
  result: number | string;
}

export interface HistoryProps {
  history: CalcHistory[];
  action: () => void;
  deleteHistory: () => void;
}
