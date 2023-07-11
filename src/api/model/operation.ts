export type Operation = {
  id: string;
  type: string;
  cost: string;
};

export type OperationExecution = {
  operation_type: string;
  operands: string[];
};
