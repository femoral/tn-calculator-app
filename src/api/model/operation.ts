export type Operation = {
  id: string;
  type: string;
  cost: string;
  operands: number;
};

export type OperationExecution = {
  operation_type: string;
  operands: string[];
};
