export enum TransactionType {
  Incoming = 0,
  Outcoming = 1
}

export interface ITransactionReport {
  id: string;
  type: TransactionType;
  confirmed: boolean;
  timeStamp: number;
  from: string;
  to: string;
  amount;
}
